import { useMemo, useState } from 'react'
import { CATEGORIES, PRODUCTS, formatINR } from './data/products'
import FurnitureIcon from './components/FurnitureIcon'
import { useCart } from './CartContext'

export default function App() {
  const [route, setRoute] = useState({ page: 'home' })
  const [cartOpen, setCartOpen] = useState(false)
  const [query, setQuery] = useState('')

  function goTo(page, params = {}) {
    setRoute({ page, ...params })
    window.scrollTo(0, 0)
  }

  return (
    <div className="app">
      <Header
        goTo={goTo}
      />

      <main>
        {route.page === 'home' && <Home goTo={goTo} />}
        {route.page === 'catalog' && (
          <Catalog
            category={route.category || 'all'}
            query={query}
            setQuery={setQuery}
            goTo={goTo}
          />
        )}
        {route.page === 'product' && (
          <ProductDetail productId={route.productId} goTo={goTo} />
        )}
        {route.page === 'checkout' && <Checkout goTo={goTo} />}
        {route.page === 'order-confirmed' && <OrderConfirmed goTo={goTo} orderId={route.orderId} />}
      </main>

      <Footer />

      {cartOpen && (
        <CartDrawer
          onClose={() => setCartOpen(false)}
          onCheckout={() => {
            setCartOpen(false)
            goTo('checkout')
          }}
        />
      )}
    </div>
  )
}

// ---------- Header ----------

function Header({ goTo }) {
  return (
    <header className="site-header">
      <div className="utility-bar">
        <span>Thoughtful furniture for beautifully lived-in homes</span>
        <span className="utility-links">Free delivery above ₹15,000 · 7-day replacement</span>
      </div>
      <div className="header-row">
        <button className="brand" onClick={() => goTo('home')} aria-label="SmartCraft home">
          <img src="/logo.jpeg" alt="SmartCraft Furniture & Interior Solutions" className="brand-logo" />
        </button>
        <nav className="category-nav" aria-label="Product categories">
          <button onClick={() => goTo('catalog', { category: 'all' })}>All products</button>
          {CATEGORIES.map((category) => (
            <button key={category.id} onClick={() => goTo('catalog', { category: category.id })}>
              {category.label}
            </button>
          ))}
        </nav>
      </div>

    </header>
  )
}

// ---------- Home ----------

function Home({ goTo }) {
  return (
    <>
      <section className="hero">
        <div className="hero-stage">
          <img
            className="hero-background"
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=88"
            alt="Warm modern living room with layered wood furniture"
          />
          <div className="hero-shade" />
          <div className="hero-copy">
            <p className="hero-eyebrow">Beautiful spaces, thoughtfully made</p>
            <h1>Comfort that feels like home.</h1>
            <p className="hero-body">
              Furniture with warm materials, considered proportions, and the everyday ease your rooms deserve.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => goTo('catalog', { category: 'all' })}>
                Explore the collection
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="strip">
        <div className="strip-item">
          <strong>5–9 days</strong>
          <span>delivery, tracked door to door</span>
        </div>
        <div className="strip-item">
          <strong>2-year</strong>
          <span>warranty on solid-wood frames</span>
        </div>
        <div className="strip-item">
          <strong>Free delivery</strong>
          <span>on orders above ₹15,000</span>
        </div>
        <div className="strip-item">
          <strong>7-day</strong>
          <span>replacement if it arrives damaged</span>
        </div>
      </section>

      <section className="home-section collection-section">
        <div className="home-section-head">
          <h2>Shop by collection</h2>
          <button className="link-button" onClick={() => goTo('catalog', { category: 'all' })}>
            View all →
          </button>
        </div>

        <div className="collection-grid">
          {CATEGORIES.map((c) => (
            <button key={c.id} className="collection-card" onClick={() => goTo('catalog', { category: c.id })}>
              <img src={imageForCategory(c.id)} alt="" className="collection-image" />
              <div>
                <span className="collection-label">{c.label}</span>
                <strong>{c.tagline}</strong>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="home-section trust-section">
        <div className="trust-intro">
          <p className="hero-eyebrow">Why homeowners choose us</p>
          <h2>Thoughtful craftsmanship for everyday living.</h2>
        </div>

        <div className="trust-grid">
          <div className="trust-card">
            <span className="trust-number">01</span>
            <h3>Solid wood focus</h3>
            <p>Everyday durability, warm finishes, and designs that age beautifully.</p>
          </div>
          <div className="trust-card">
            <span className="trust-number">02</span>
            <h3>Made for practical homes</h3>
            <p>Storage, comfort, and smart dimensions built around real room sizes.</p>
          </div>
          <div className="trust-card">
            <span className="trust-number">03</span>
            <h3>Simple buying experience</h3>
            <p>Clear pricing, easy checkout, and delivery support from cart to doorstep.</p>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-head">
          <h2>Best sellers</h2>
          <button className="link-button" onClick={() => goTo('catalog', { category: 'all' })}>
            View all →
          </button>
        </div>
        <ProductGrid products={topRated(PRODUCTS, 4)} goTo={goTo} />
      </section>

      <section className="home-section browse-filter-section">
        <div className="browse-filter-intro">
          <p className="hero-eyebrow">Shop by space</p>
          <h2>Find the right piece for your home.</h2>
        </div>
        <div className="browse-filter-list">
          {CATEGORIES.map((category) => (
            <details className="browse-filter" key={category.id}>
              <summary>{category.label}<span aria-hidden="true">⌄</span></summary>
              <div className="browse-filter-content">
                <p>{category.tagline}</p>
                <button className="link-button" onClick={() => goTo('catalog', { category: category.id })}>
                  View {category.label} →
                </button>
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}

function iconForCategory(categoryId) {
  if (categoryId === 'beds') return 'bed'
  if (categoryId === 'almirahs') return 'almirah'
  return 'dressing-table'
}

function imageForCategory(categoryId) {
  return PRODUCTS.find((product) => product.category === categoryId)?.image
}

function topRated(products, count) {
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, count)
}

// ---------- Catalog ----------

function Catalog({ category, query, setQuery, goTo }) {
  const [sort, setSort] = useState('popularity')
  const [maxPrice, setMaxPrice] = useState(50000)
  const [viewMode, setViewMode] = useState('grid')

  const filtered = useMemo(() => {
    let list = PRODUCTS
    if (category !== 'all') list = list.filter((p) => p.category === category)
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q)
      )
    }
    list = list.filter((p) => p.price <= maxPrice)

    const sorted = [...list]
    if (sort === 'price-low') sorted.sort((a, b) => a.price - b.price)
    if (sort === 'price-high') sorted.sort((a, b) => b.price - a.price)
    if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating)
    return sorted
  }, [category, query, sort, maxPrice])

  const categoryLabel =
    category === 'all' ? 'All products' : CATEGORIES.find((c) => c.id === category)?.label

  return (
    <section className="catalog">
      <div className="catalog-head">
        <div>
          <h1>{categoryLabel}</h1>
          <p className="catalog-count">{filtered.length} products</p>
        </div>
        {query && (
          <p className="catalog-query">
            Showing results for "{query}"{' '}
            <button className="link-button" onClick={() => setQuery('')}>
              clear
            </button>
          </p>
        )}
      </div>

      <div className="catalog-body">
        <aside className="catalog-filters">
          <div className="filter-head">
            <h2>Filter by</h2>
            <button
              className="clear-filter"
              onClick={() => {
                setMaxPrice(50000)
                setSort('popularity')
                setQuery('')
                goTo('catalog', { category: 'all' })
              }}
            >
              Clear all
            </button>
          </div>
          <div className="filter-block">
            <h3>Category</h3>
            <button
              className={category === 'all' ? 'filter-active' : ''}
              onClick={() => goTo('catalog', { category: 'all' })}
            >
              All
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                className={category === c.id ? 'filter-active' : ''}
                onClick={() => goTo('catalog', { category: c.id })}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="filter-block">
            <h3>Max price: {formatINR(maxPrice)}</h3>
            <input
              type="range"
              min="8000"
              max="50000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>

        </aside>

        <div className="catalog-results">
          <div className="catalog-toolbar">
            <span>Showing {filtered.length} products</span>
            <div className="catalog-toolbar-actions">
              <button
                className={viewMode === 'grid' ? 'view-button view-active' : 'view-button'}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                ▦
              </button>
              <button
                className={viewMode === 'list' ? 'view-button view-active' : 'view-button'}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                ▤
              </button>
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
                <option value="popularity">Best selling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
          {filtered.length === 0 ? (
            <p className="empty-state">
              Nothing matches that yet. Try a higher price limit or clear the search.
            </p>
          ) : (
            <ProductGrid products={filtered} goTo={goTo} viewMode={viewMode} />
          )}
        </div>
      </div>
    </section>
  )
}

// ---------- Shared product grid / card ----------

function ProductGrid({ products, goTo, viewMode = 'grid' }) {
  return (
    <div className={viewMode === 'list' ? 'product-grid list-view' : 'product-grid'}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} goTo={goTo} />
      ))}
    </div>
  )
}

function ProductCard({ product, goTo }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const discountPct = Math.round(((product.mrp - product.price) / product.mrp) * 100)

  return (
    <div className="product-card">
      <button className="product-card-media" onClick={() => goTo('product', { productId: product.id })}>
        {product.image ? (
          <img src={product.image} alt={product.name} className="product-image" />
        ) : (
          <FurnitureIcon type={product.icon} className="product-icon" />
        )}
        {discountPct > 0 && <span className="discount-tag">{discountPct}% off</span>}
      </button>
      <div className="product-card-body">
        <button className="product-name" onClick={() => goTo('product', { productId: product.id })}>
          {product.name}
        </button>
        <p className="product-meta">
          {product.material} · {product.color}
        </p>
        <p className="product-rating">
          ★ {product.rating} <span className="review-count">({product.reviews})</span>
        </p>
        <p className="product-price">
          <span className="price-now">{formatINR(product.price)}</span>
          {product.mrp > product.price && <span className="price-mrp">{formatINR(product.mrp)}</span>}
        </p>
        <button
          className={added ? 'btn-added' : 'btn-primary btn-block'}
          onClick={() => {
            addToCart(product.id, 1)
            setAdded(true)
            setTimeout(() => setAdded(false), 1400)
          }}
        >
          {added ? 'Added ✓' : 'Add to cart'}
        </button>
      </div>
    </div>
  )
}

// ---------- Product detail ----------

function ProductDetail({ productId, goTo }) {
  const product = PRODUCTS.find((p) => p.id === productId)
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <section className="detail-missing">
        <p>That product isn't in the catalog (anymore).</p>
        <button className="btn-primary" onClick={() => goTo('catalog', { category: 'all' })}>
          Back to catalog
        </button>
      </section>
    )
  }

  const discountPct = Math.round(((product.mrp - product.price) / product.mrp) * 100)
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <section className="product-detail">
      <button className="back-link" onClick={() => goTo('catalog', { category: product.category })}>
        ← Back to {CATEGORIES.find((c) => c.id === product.category)?.label}
      </button>

      <div className="detail-grid">
        <div className="detail-media">
          {product.image ? (
            <img src={product.image} alt={product.name} className="detail-image" />
          ) : (
            <FurnitureIcon type={product.icon} className="detail-icon" />
          )}
        </div>

        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="product-rating">
            ★ {product.rating} <span className="review-count">({product.reviews} ratings)</span>
          </p>

          <p className="product-price detail-price">
            <span className="price-now">{formatINR(product.price)}</span>
            {product.mrp > product.price && (
              <>
                <span className="price-mrp">{formatINR(product.mrp)}</span>
                <span className="discount-inline">{discountPct}% off</span>
              </>
            )}
          </p>

          <p className="detail-description">{product.description}</p>

          <ul className="spec-list">
            <li><strong>Material:</strong> {product.material}</li>
            <li><strong>Size:</strong> {product.size}</li>
            <li><strong>Color:</strong> {product.color}</li>
            <li><strong>Storage:</strong> {product.storage}</li>
            <li><strong>Availability:</strong> {product.stock > 0 ? `In stock (${product.stock} left)` : 'Out of stock'}</li>
          </ul>

          <ul className="highlight-list">
            {product.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          <div className="detail-buy-row">
            <div className="qty-stepper">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} aria-label="Increase quantity">+</button>
            </div>
            <button
              className={added ? 'btn-added' : 'btn-primary'}
              disabled={product.stock === 0}
              onClick={() => {
                addToCart(product.id, qty)
                setAdded(true)
                setTimeout(() => setAdded(false), 1400)
              }}
            >
              {added ? 'Added to cart ✓' : 'Add to cart'}
            </button>
            <button
              className="btn-ghost"
              disabled={product.stock === 0}
              onClick={() => {
                addToCart(product.id, qty)
                goTo('checkout')
              }}
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="home-section">
          <div className="home-section-head">
            <h2>You might also like</h2>
          </div>
          <ProductGrid products={related} goTo={goTo} />
        </div>
      )}
    </section>
  )
}

// ---------- Cart drawer ----------

function CartDrawer({ onClose, onCheckout }) {
  const { lineItems, subtotal, mrpTotal, savings, deliveryFee, total, setQty, removeFromCart } = useCart()

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <h2>Your cart</h2>
          <button className="drawer-close" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        {lineItems.length === 0 ? (
          <p className="empty-state">Your cart is empty. Go find a bed you like.</p>
        ) : (
          <>
            <div className="drawer-items">
              {lineItems.map(({ product, qty }) => (
                <div className="drawer-item" key={product.id}>
                  <FurnitureIcon type={product.icon} className="drawer-item-icon" />
                  <div className="drawer-item-info">
                    <p className="drawer-item-name">{product.name}</p>
                    <p className="drawer-item-price">{formatINR(product.price)}</p>
                    <div className="qty-stepper qty-stepper-small">
                      <button onClick={() => setQty(product.id, qty - 1)} aria-label="Decrease quantity">−</button>
                      <span>{qty}</span>
                      <button
                        onClick={() => setQty(product.id, Math.min(product.stock, qty + 1))}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button className="drawer-item-remove" onClick={() => removeFromCart(product.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="drawer-summary">
              <div className="summary-row">
                <span>MRP total</span>
                <span>{formatINR(mrpTotal)}</span>
              </div>
              <div className="summary-row summary-savings">
                <span>You save</span>
                <span>− {formatINR(savings)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? 'Free' : formatINR(deliveryFee)}</span>
              </div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>{formatINR(total)}</span>
              </div>
              <button className="btn-primary btn-block" onClick={onCheckout}>
                Proceed to checkout · {formatINR(total)}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ---------- Checkout ----------

function Checkout({ goTo }) {
  const { lineItems, subtotal, savings, deliveryFee, total, clearCart } = useCart()
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', pincode: '' })
  const [placing, setPlacing] = useState(false)

  if (lineItems.length === 0) {
    return (
      <section className="checkout-empty">
        <h1>Nothing to check out</h1>
        <p>Your cart is empty right now.</p>
        <button className="btn-primary" onClick={() => goTo('catalog', { category: 'all' })}>
          Browse the catalog
        </button>
      </section>
    )
  }

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function placeOrder(e) {
    e.preventDefault()
    setPlacing(true)
    // Simulated order placement — wire this up to a real payment/order API.
    setTimeout(() => {
      const orderId = 'SC' + Math.floor(100000 + Math.random() * 900000)
      clearCart()
      goTo('order-confirmed', { orderId })
    }, 700)
  }

  return (
    <section className="checkout">
      <h1>Checkout</h1>
      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={placeOrder}>
          <h2>Delivery details</h2>
          <label>
            Full name
            <input required value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
          </label>
          <label>
            Phone number
            <input
              required
              type="tel"
              pattern="[0-9]{10}"
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </label>
          <label>
            Address
            <textarea
              required
              rows={3}
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </label>
          <div className="form-row">
            <label>
              City
              <input required value={form.city} onChange={(e) => handleChange('city', e.target.value)} />
            </label>
            <label>
              Pincode
              <input
                required
                pattern="[0-9]{6}"
                value={form.pincode}
                onChange={(e) => handleChange('pincode', e.target.value)}
              />
            </label>
          </div>

          <h2>Payment</h2>
          <p className="checkout-note">
            This prototype simulates payment — no real transaction happens. Wire up Razorpay, Stripe,
            or your preferred gateway here before going live.
          </p>

          <button className="btn-primary btn-block" type="submit" disabled={placing}>
            {placing ? 'Placing order…' : `Place order · ${formatINR(total)}`}
          </button>
        </form>

        <div className="checkout-summary">
          <h2>Order summary</h2>
          {lineItems.map(({ product, qty }) => (
            <div className="checkout-line" key={product.id}>
              <span>
                {product.name} × {qty}
              </span>
              <span>{formatINR(product.price * qty)}</span>
            </div>
          ))}
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatINR(subtotal)}</span>
          </div>
          <div className="summary-row summary-savings">
            <span>Savings</span>
            <span>− {formatINR(savings)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>{deliveryFee === 0 ? 'Free' : formatINR(deliveryFee)}</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>{formatINR(total)}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function OrderConfirmed({ goTo, orderId }) {
  return (
    <section className="order-confirmed">
      <h1>Order placed</h1>
      <p>Your order <strong>#{orderId}</strong> is confirmed. A confirmation would normally be sent by SMS and email.</p>
      <p className="checkout-note">Expected delivery: 5–9 working days.</p>
      <button className="btn-primary" onClick={() => goTo('home')}>
        Back to home
      </button>
    </section>
  )
}

// ---------- Footer ----------

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <p className="brand-name-footer">SmartCraft Furnishing Solutions</p>
        <p>Beds · Almirahs · Dressing Tables — delivered across India.</p>
      </div>
      <p className="footer-note">This is a demo storefront. Prices and stock are illustrative.</p>
    </footer>
  )
}
