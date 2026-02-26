import express from 'express'
import infowayService from '../services/infowayService.js'
import User from '../models/User.js'
import Wallet from '../models/Wallet.js'
import Transaction from '../models/Transaction.js'

const router = express.Router()

// POST /api/infoway/create-order - Create payment order for deposit
router.post('/create-order', async (req, res) => {
  try {
    const { userId, amount, currency = 'INR' } = req.body

    if (!userId || !amount || amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'User ID and valid amount are required' 
      })
    }

    // Get user details
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      })
    }

    // Generate unique order ID
    const orderId = `DEP_${userId}_${Date.now()}`

    // Create payment order data
    const paymentData = {
      orderId,
      amount,
      currency,
      customerEmail: user.email,
      customerPhone: user.phone || '0000000000',
      customerName: `${user.firstName} ${user.lastName}`,
      returnUrl: `${process.env.FRONTEND_URL}/payment/return`,
      notifyUrl: `${process.env.API_URL}/api/infoway/webhook`,
      description: `Deposit of ${amount} ${currency} for ${user.firstName} ${user.lastName}`
    }

    // Create payment order with Infoway
    const result = await infowayService.createPaymentOrder(paymentData)

    if (result.success) {
      // Create transaction record
      await Transaction.create({
        userId,
        type: 'DEPOSIT',
        amount,
        currency,
        status: 'PENDING',
        orderId: result.orderId,
        transactionId: result.transactionId,
        paymentMethod: 'Infoway',
        description: `Deposit via Infoway - Order ID: ${result.orderId}`
      })

      res.json({
        success: true,
        orderId: result.orderId,
        paymentUrl: result.paymentUrl,
        transactionId: result.transactionId,
        amount,
        currency
      })
    } else {
      res.status(500).json(result)
    }
  } catch (error) {
    console.error('[Infoway] Error creating payment order:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Error creating payment order', 
      error: error.message 
    })
  }
})

// POST /api/infoway/verify-payment - Verify payment status
router.post('/verify-payment', async (req, res) => {
  try {
    const { transactionId } = req.body

    if (!transactionId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Transaction ID is required' 
      })
    }

    // Verify payment with Infoway
    const result = await infowayService.verifyPayment(transactionId)

    if (result.success) {
      // Find and update transaction
      const transaction = await Transaction.findOne({ transactionId })
      if (!transaction) {
        return res.status(404).json({ 
          success: false, 
          message: 'Transaction not found' 
        })
      }

      // Update transaction status
      transaction.status = result.status === 'SUCCESS' ? 'COMPLETED' : 'FAILED'
      transaction.paymentDate = result.paymentDate
      transaction.paymentMethod = result.paymentMethod

      await transaction.save()

      // If payment successful, update wallet
      if (result.status === 'SUCCESS') {
        const wallet = await Wallet.findOne({ userId: transaction.userId })
        if (wallet) {
          wallet.balance += transaction.amount
          await wallet.save()
        }
      }

      res.json({
        success: true,
        status: result.status,
        transaction: {
          id: transaction._id,
          orderId: transaction.orderId,
          transactionId: transaction.transactionId,
          amount: transaction.amount,
          currency: transaction.currency,
          status: transaction.status,
          paymentDate: transaction.paymentDate,
          paymentMethod: transaction.paymentMethod
        }
      })
    } else {
      res.status(500).json(result)
    }
  } catch (error) {
    console.error('[Infoway] Error verifying payment:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Error verifying payment', 
      error: error.message 
    })
  }
})

// POST /api/infoway/webhook - Process webhook notifications
router.post('/webhook', async (req, res) => {
  try {
    const { signature } = req.headers
    const payload = req.body

    if (!signature) {
      return res.status(400).json({ 
        success: false, 
        message: 'Signature is required' 
      })
    }

    // Process webhook
    const result = infowayService.processWebhook(payload, signature)

    if (result.success) {
      // Find transaction
      const transaction = await Transaction.findOne({ 
        transactionId: result.transactionId 
      })

      if (transaction) {
        // Update transaction
        transaction.status = result.status === 'SUCCESS' ? 'COMPLETED' : 'FAILED'
        transaction.paymentDate = result.paymentDate
        transaction.paymentMethod = result.paymentMethod

        await transaction.save()

        // If payment successful, update wallet
        if (result.status === 'SUCCESS') {
          const wallet = await Wallet.findOne({ userId: transaction.userId })
          if (wallet) {
            wallet.balance += transaction.amount
            await wallet.save()
          }
        }

        console.log(`[Infoway] Webhook processed: ${result.transactionId} - ${result.status}`)
      }
    }

    // Always return 200 to webhook
    res.status(200).json({ success: true })
  } catch (error) {
    console.error('[Infoway] Error processing webhook:', error)
    res.status(500).json({ success: false })
  }
})

// POST /api/infoway/refund - Process refund
router.post('/refund', async (req, res) => {
  try {
    const { transactionId, refundAmount, reason } = req.body

    if (!transactionId || !refundAmount || refundAmount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Transaction ID and valid refund amount are required' 
      })
    }

    // Find transaction
    const transaction = await Transaction.findOne({ transactionId })
    if (!transaction) {
      return res.status(404).json({ 
        success: false, 
        message: 'Transaction not found' 
      })
    }

    // Process refund with Infoway
    const result = await infowayService.refundPayment(
      transactionId, 
      refundAmount, 
      reason
    )

    if (result.success) {
      // Create refund transaction
      await Transaction.create({
        userId: transaction.userId,
        type: 'REFUND',
        amount: refundAmount,
        currency: transaction.currency,
        status: 'COMPLETED',
        orderId: `REFUND_${transaction.orderId}`,
        transactionId: result.refundId,
        paymentMethod: 'Infoway',
        description: `Refund for order ${transaction.orderId} - ${reason || 'Customer requested'}`
      })

      // Update wallet
      const wallet = await Wallet.findOne({ userId: transaction.userId })
      if (wallet) {
        wallet.balance -= refundAmount
        await wallet.save()
      }

      res.json({
        success: true,
        refundId: result.refundId,
        transactionId: result.transactionId,
        refundAmount: result.refundAmount,
        status: result.status
      })
    } else {
      res.status(500).json(result)
    }
  } catch (error) {
    console.error('[Infoway] Error processing refund:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Error processing refund', 
      error: error.message 
    })
  }
})

// GET /api/infoway/transactions/:userId - Get user's Infoway transactions
router.get('/transactions/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const { page = 1, limit = 10, status } = req.query

    const query = { 
      userId, 
      paymentMethod: 'Infoway' 
    }

    if (status) {
      query.status = status
    }

    const transactions = await Transaction.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Transaction.countDocuments(query)

    res.json({
      success: true,
      transactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('[Infoway] Error fetching transactions:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching transactions', 
      error: error.message 
    })
  }
})

export default router
