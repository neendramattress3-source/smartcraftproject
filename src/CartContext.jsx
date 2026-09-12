import { createContext, useContext, useEffect, useState } from 'react'
import { PRODUCTS } from './data/products'

const CartContext = createContext(null)

const STORAGE_KEY = 'smartcraft_cart_v1'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addToCart(productId, qty = 1) {
    setItems((prev) => {
      const current = prev[productId] || 0
      return { ...prev, [productId]: current + qty }
    })
  }

  function removeFromCart(productId) {
    setItems((prev) => {
      const next = { ...prev }
      delete next[productId]
      return next
    })
  }

  function setQty(productId, qty) {
    setItems((prev) => {
      if (qty <= 0) {
        const next = { ...prev }
        delete next[productId]
        return next
      }
      return { ...prev, [productId]: qty }
    })
  }

  function clearCart() {
    setItems({})
  }

  const lineItems = Object.entries(items)
    .map(([id, qty]) => {
      const product = PRODUCTS.find((p) => p.id === id)
      return product ? { product, qty } : null
    })
    .filter(Boolean)

  const totalItems = lineItems.reduce((sum, li) => sum + li.qty, 0)
  const subtotal = lineItems.reduce((sum, li) => sum + li.qty * li.product.price, 0)
  const mrpTotal = lineItems.reduce((sum, li) => sum + li.qty * li.product.mrp, 0)
  const savings = mrpTotal - subtotal
  const deliveryFee = subtotal > 15000 || subtotal === 0 ? 0 : 499
  const total = subtotal + deliveryFee

  const value = {
    lineItems,
    totalItems,
    subtotal,
    mrpTotal,
    savings,
    deliveryFee,
    total,
    addToCart,
    removeFromCart,
    setQty,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
