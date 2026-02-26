import crypto from 'crypto'

class InfowayService {
  constructor() {
    this.apiKey = process.env.INFOWAY_API_KEY || '717d0daf36664c828b55cdbbbe9953cf-infoway'
    this.baseUrl = process.env.INFOWAY_BASE_URL || 'https://api.infoway.com'
    this.merchantId = process.env.INFOWAY_MERCHANT_ID
    this.secretKey = process.env.INFOWAY_SECRET_KEY
  }

  // Generate signature for Infoway API
  generateSignature(data) {
    const sortedKeys = Object.keys(data).sort()
    const stringToSign = sortedKeys.map(key => `${key}=${data[key]}`).join('&')
    return crypto.createHash('sha256').update(stringToSign + this.secretKey).digest('hex')
  }

  // Create payment order
  async createPaymentOrder(paymentData) {
    try {
      const {
        orderId,
        amount,
        currency = 'INR',
        customerEmail,
        customerPhone,
        customerName,
        returnUrl,
        notifyUrl,
        description
      } = paymentData

      const payload = {
        apiKey: this.apiKey,
        orderId,
        amount: amount.toString(),
        currency,
        customerEmail,
        customerPhone,
        customerName,
        returnUrl,
        notifyUrl,
        description: description || `Payment for order ${orderId}`,
        timestamp: Date.now().toString()
      }

      // Generate signature
      const signature = this.generateSignature(payload)
      payload.signature = signature

      console.log('[Infoway] Creating payment order:', payload)

      const response = await fetch(`${this.baseUrl}/payment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const result = await response.json()

      if (result.success) {
        console.log('[Infoway] Payment order created:', result)
        return {
          success: true,
          orderId: result.orderId,
          paymentUrl: result.paymentUrl,
          transactionId: result.transactionId
        }
      } else {
        console.error('[Infoway] Payment order creation failed:', result)
        return {
          success: false,
          message: result.message || 'Payment order creation failed'
        }
      }
    } catch (error) {
      console.error('[Infoway] Error creating payment order:', error)
      return {
        success: false,
        message: error.message
      }
    }
  }

  // Verify payment status
  async verifyPayment(transactionId) {
    try {
      const payload = {
        apiKey: this.apiKey,
        transactionId,
        timestamp: Date.now().toString()
      }

      const signature = this.generateSignature(payload)
      payload.signature = signature

      console.log('[Infoway] Verifying payment:', payload)

      const response = await fetch(`${this.baseUrl}/payment/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const result = await response.json()

      if (result.success) {
        console.log('[Infoway] Payment verified:', result)
        return {
          success: true,
          status: result.status, // SUCCESS, FAILED, PENDING
          transactionId: result.transactionId,
          orderId: result.orderId,
          amount: result.amount,
          currency: result.currency,
          paymentDate: result.paymentDate,
          paymentMethod: result.paymentMethod
        }
      } else {
        console.error('[Infoway] Payment verification failed:', result)
        return {
          success: false,
          message: result.message || 'Payment verification failed'
        }
      }
    } catch (error) {
      console.error('[Infoway] Error verifying payment:', error)
      return {
        success: false,
        message: error.message
      }
    }
  }

  // Process webhook notification
  processWebhook(payload, signature) {
    try {
      // Verify webhook signature
      const expectedSignature = this.generateSignature(payload)
      if (signature !== expectedSignature) {
        console.error('[Infoway] Invalid webhook signature')
        return { success: false, message: 'Invalid signature' }
      }

      console.log('[Infoway] Processing webhook:', payload)

      return {
        success: true,
        transactionId: payload.transactionId,
        orderId: payload.orderId,
        status: payload.status,
        amount: payload.amount,
        currency: payload.currency,
        paymentDate: payload.paymentDate,
        paymentMethod: payload.paymentMethod
      }
    } catch (error) {
      console.error('[Infoway] Error processing webhook:', error)
      return {
        success: false,
        message: error.message
      }
    }
  }

  // Refund payment
  async refundPayment(transactionId, refundAmount, reason) {
    try {
      const payload = {
        apiKey: this.apiKey,
        transactionId,
        refundAmount: refundAmount.toString(),
        reason: reason || 'Customer requested refund',
        timestamp: Date.now().toString()
      }

      const signature = this.generateSignature(payload)
      payload.signature = signature

      console.log('[Infoway] Processing refund:', payload)

      const response = await fetch(`${this.baseUrl}/payment/refund`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const result = await response.json()

      if (result.success) {
        console.log('[Infoway] Refund processed:', result)
        return {
          success: true,
          refundId: result.refundId,
          transactionId: result.transactionId,
          refundAmount: result.refundAmount,
          status: result.status
        }
      } else {
        console.error('[Infoway] Refund failed:', result)
        return {
          success: false,
          message: result.message || 'Refund failed'
        }
      }
    } catch (error) {
      console.error('[Infoway] Error processing refund:', error)
      return {
        success: false,
        message: error.message
      }
    }
  }
}

export default new InfowayService()
