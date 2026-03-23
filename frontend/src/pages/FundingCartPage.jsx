import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, ShoppingBag } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  getFundingCart,
  removeFromFundingCart,
  clearFundingCart
} from '../lib/fundingCart'

export default function FundingCartPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState(getFundingCart)

  const refresh = () => setItems(getFundingCart())

  useEffect(() => {
    const onUpdate = () => refresh()
    window.addEventListener('funding-cart-updated', onUpdate)
    window.addEventListener('storage', onUpdate)
    return () => {
      window.removeEventListener('funding-cart-updated', onUpdate)
      window.removeEventListener('storage', onUpdate)
    }
  }, [])

  const total = items.reduce((sum, i) => sum + (i.price || 0), 0)

  const goCheckout = (item) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user._id) {
      toast.error('Please log in to continue')
      const dest = `/buy-challenge?steps=${item.stepsCount}&size=${item.accountSize}`
      navigate(`/user/login?redirect=${encodeURIComponent(dest)}`)
      return
    }
    navigate(`/buy-challenge?steps=${item.stepsCount}&size=${item.accountSize}`)
  }

  return (
    <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl font-bold text-white mb-2 flex items-center gap-3">
        <ShoppingBag className="w-8 h-8 text-cyan-400" />
        Cart
      </h1>
      <p className="text-white/50 text-sm mb-8">Funding challenge plans you added</p>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
          <p className="text-white/60 mb-6">Your cart is empty.</p>
          <button
            type="button"
            onClick={() => navigate('/fundings')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold"
          >
            View funding plans
          </button>
        </div>
      ) : (
        <>
          <ul className="space-y-3 mb-8">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div>
                  <p className="text-white font-medium">{item.label}</p>
                  <p className="text-white/50 text-sm">
                    {item.challengeType === '1-step' ? '1-Step' : '2-Step'} · ${item.accountSize.toLocaleString()} account
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xl font-bold text-amber-400">${item.price}</span>
                  <button
                    type="button"
                    onClick={() => goCheckout(item)}
                    className="px-4 py-2 rounded-xl bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600"
                  >
                    Checkout
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      removeFromFundingCart(item.id)
                      refresh()
                      toast.success('Removed from cart')
                    }}
                    className="p-2 rounded-lg text-white/50 hover:text-red-400 hover:bg-white/5"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-white/10 bg-bluestone-deep/50 p-6">
            <div>
              <p className="text-white/50 text-sm">Subtotal ({items.length} {items.length === 1 ? 'plan' : 'plans'})</p>
              <p className="text-2xl font-bold text-white">${total.toLocaleString()}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                clearFundingCart()
                refresh()
                toast.success('Cart cleared')
              }}
              className="text-sm text-white/50 hover:text-white underline-offset-2 hover:underline self-start sm:self-center"
            >
              Clear cart
            </button>
          </div>
        </>
      )}
    </div>
  )
}
