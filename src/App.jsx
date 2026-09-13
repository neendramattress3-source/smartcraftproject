import { useMemo, useState } from 'react'
import { CATEGORIES, PRODUCTS, ROOM_CATEGORIES, formatINR } from './data/products'
import FurnitureIcon from './components/FurnitureIcon'
import { useCart } from './CartContext'

const CATALOG_CATEGORIES = [...CATEGORIES, ...ROOM_CATEGORIES]

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
        query={query}
        setQuery={setQuery}
        onCartClick={() => setCartOpen(true)}
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
        {route.page === 'about' && <AboutUs goTo={goTo} />}
        {route.page === 'contact' && <ContactUs goTo={goTo} />}
      </main>

      <Footer goTo={goTo} />

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

function Header({ goTo, query, setQuery, onCartClick }) {
  const { totalItems } = useCart()

  function submitSearch(event) {
    event.preventDefault()
    goTo('catalog', { category: 'all' })
  }

  return (
    <header className="site-header">
      <div className="utility-bar">
        <span className="utility-item"><span className="utility-icon">⌂</span>Call Now: +91-7503770117</span>
        <span className="utility-item utility-links"><span className="utility-icon">☆</span>Trusted by 5,00,000+ Happy Customers</span>
      </div>
      <div className="header-row">
        <button className="brand" onClick={() => goTo('home')} aria-label="SmartCraft home">
          <img src="/logo.jpeg" alt="SmartCraft Furniture & Interior Solutions" className="brand-logo" />
        </button>
        <form className="search-form" onSubmit={submitSearch} role="search">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for furniture"
            aria-label="Search for furniture"
          />
          {query && (
            <button type="button" className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">
              ×
            </button>
          )}
          <button type="submit" aria-label="Search">⌕</button>
        </form>
        <div className="header-actions">
          <button className="header-action" onClick={() => goTo('home')}>
            <img src="/icons/store.svg" alt="" className="header-action-icon" />
            <span>Store</span>
          </button>
          <button className="header-action" onClick={() => goTo('home')}>
            <img src="/icons/account.svg" alt="" className="header-action-icon" />
            <span>Account</span>
          </button>
          <button className="header-action" onClick={() => goTo('home')}>
            <img src="/icons/wishlist.svg" alt="" className="header-action-icon" />
            <span>Wishlist</span>
            <b className="action-badge">0</b>
          </button>
          <button className="header-action" onClick={onCartClick}>
            <img src="/icons/cart.svg" alt="" className="header-action-icon" />
            <span>Cart</span>
            <b className="action-badge">{totalItems}</b>
          </button>
        </div>
      </div>
      <nav className="category-nav" aria-label="Furniture categories">
        {ROOM_CATEGORIES.map((room) => (
          <button key={room.id} onClick={() => goTo('catalog', { category: room.id })}>
            {room.label}
          </button>
        ))}
        <button onClick={() => goTo('about')}>About Us</button>
      </nav>
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

      <section className="home-section room-categories-section" id="room-categories">
        <div className="home-section-head">
          <div>
            <p className="hero-eyebrow">Shop by room</p>
            <h2>Furniture for every part of home.</h2>
          </div>
          <button className="link-button" onClick={() => goTo('catalog', { category: 'all' })}>View all →</button>
        </div>
        <div className="room-category-grid">
          {ROOM_CATEGORIES.map((room) => (
            <button className="room-category-card" key={room.id} onClick={() => goTo('catalog', { category: room.id })}>
              <img src={room.image} alt={`${room.label} furniture`} />
              <span className="room-category-copy">
                <strong>{room.label}</strong>
                <small>From {formatINR(room.price)}</small>
              </span>
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

      <BestSellers goTo={goTo} />
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

function BestSellers({ goTo }) {
  const [category, setCategory] = useState('all')
  const [maxPrice, setMaxPrice] = useState(50000)
  const filteredProducts = topRated(
    PRODUCTS.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category
      return matchesCategory && product.price <= maxPrice
    }),
    80
  )

  function resetFilters() {
    setCategory('all')
    setMaxPrice(50000)
  }

  return (
    <section className="home-section best-sellers-section">
      <div className="home-section-head">
        <h2>Best sellers</h2>
        <button className="link-button" onClick={() => goTo('catalog', { category: 'all' })}>
          View all →
        </button>
      </div>

      <div className="best-sellers-layout">
        <aside className="catalog-filters best-seller-filters">
          <div className="filter-head">
            <h2>Filter by</h2>
            <button className="clear-filter" onClick={resetFilters}>Clear all</button>
          </div>
          <div className="filter-block">
            <h3>Category</h3>
            <button className={category === 'all' ? 'filter-active' : ''} onClick={() => setCategory('all')}>
              All
            </button>
            {CATEGORIES.map((item) => (
              <button
                key={item.id}
                className={category === item.id ? 'filter-active' : ''}
                onClick={() => setCategory(item.id)}
              >
                {item.label}
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
              onChange={(event) => setMaxPrice(Number(event.target.value))}
            />
          </div>
        </aside>

        <div className="best-seller-results">
          <div className="catalog-toolbar">
            <span>Showing {filteredProducts.length} products</span>
            <div className="catalog-toolbar-actions">
              <button className="view-button view-active" aria-label="Grid view">▦</button>
              <button className="view-button" onClick={() => goTo('catalog', { category })} aria-label="View all products">▤</button>
              <button className="best-seller-sort" onClick={() => goTo('catalog', { category: 'all' })}>
                Best selling
              </button>
            </div>
          </div>
          <p className="best-seller-count">Showing {filteredProducts.length} best-selling products</p>
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} goTo={goTo} />
          ) : (
            <p className="empty-state">No best sellers match these filters.</p>
          )}
        </div>
      </div>
    </section>
  )
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
    category === 'all' ? 'All products' : CATALOG_CATEGORIES.find((c) => c.id === category)?.label

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
            {CATALOG_CATEGORIES.map((c) => (
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
        ← Back to {CATALOG_CATEGORIES.find((c) => c.id === product.category)?.label}
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

function AboutUs({ goTo }) {
  return (
    <section className="info-page">
      <div className="info-hero">
        <p className="hero-eyebrow">About SmartCraft</p>
        <h1>Furniture made for beautifully lived-in homes.</h1>
        <p>We bring together dependable materials, thoughtful proportions, and honest pricing so every room feels considered without feeling precious.</p>
      </div>

      <div className="info-grid">
        <div className="info-copy">
          <h2>Built around real homes.</h2>
          <p>SmartCraft Furnishing Solutions helps families choose furniture that works hard every day. From solid-wood beds to practical storage and welcoming living-room pieces, our collection is selected for comfort, durability, and easy everyday living.</p>
          <p>Our team supports you from product selection through delivery, with clear prices and room-friendly dimensions at every step.</p>
          <button className="btn-primary" onClick={() => goTo('contact')}>Contact us</button>
        </div>
        <img className="info-image" src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85" alt="Warmly furnished living room" />
      </div>

      <div className="about-values">
        <div><strong>01</strong><h3>Thoughtful materials</h3><p>Warm finishes and sturdy construction selected for daily use.</p></div>
        <div><strong>02</strong><h3>Practical design</h3><p>Useful storage and proportions that suit real room sizes.</p></div>
        <div><strong>03</strong><h3>Helpful service</h3><p>Clear buying support, tracked delivery, and simple replacement help.</p></div>
      </div>
    </section>
  )
}

function ContactUs({ goTo }) {
  const [sent, setSent] = useState(false)

  function submitContact(event) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section className="info-page contact-page">
      <div className="info-hero">
        <p className="hero-eyebrow">Contact SmartCraft</p>
        <h1>Let us help with your space.</h1>
        <p>Tell us what you are furnishing and our team will get back to you with practical recommendations.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-card">
          <h2>Contact details</h2>
          <a href="tel:+917503770117"><strong>Call us</strong><span>+91-7503770117</span></a>
          <a href="mailto:hello@smartcraftfurnishing.com"><strong>Email us</strong><span>hello@smartcraftfurnishing.com</span></a>
          <div><strong>Service hours</strong><span>Monday to Saturday, 10:00 AM to 7:00 PM</span></div>
          <button className="link-button" onClick={() => goTo('home')}>Back to home →</button>
        </div>
        <form className="contact-form" onSubmit={submitContact}>
          <h2>Send an enquiry</h2>
          <label>Name<input required /></label>
          <label>Phone number<input required type="tel" pattern="[0-9]{10}" placeholder="10-digit mobile number" /></label>
          <label>How can we help?<textarea required rows={5} /></label>
          {sent && <p className="contact-success">Thanks. Our team will contact you shortly.</p>}
          <button className="btn-primary" type="submit">Send message</button>
        </form>
      </div>
    </section>
  )
}

// ---------- Footer ----------

function Footer({ goTo }) {
  return (
    <>
      <section className="footer-benefits" aria-label="Why shop with us">
        <div><span className="footer-benefit-icon">◆</span><span><strong>Manufacturing Unit</strong><small>Best quality at the best price</small></span></div>
        <div><span className="footer-benefit-icon">✎</span><span><strong>Custom-Made Options</strong><small>Tailored to your style and comfort</small></span></div>
        <div><span className="footer-benefit-icon">✓</span><span><strong>Durable &amp; Reliable</strong><small>Long-lasting furniture with top-grade craftsmanship</small></span></div>
        <div><span className="footer-benefit-icon">▤</span><span><strong>Bulk &amp; Corporate Orders</strong><small>Special pricing and dedicated support for businesses</small></span></div>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand-column">
            <div className="footer-logo-panel">
              <img src="/logo.jpeg" alt="SmartCraft Furniture & Interior Solutions" />
            </div>
            <p className="footer-description">Premium furniture, crafted for comfort and designed for your lifestyle.</p>
            <p className="footer-contact">☎ <a href="tel:+917503770117">+91 7503770117</a></p>
            <p className="footer-contact">✉ <a href="mailto:hello@smartcraftfurnishing.com">hello@smartcraftfurnishing.com</a></p>
            <p className="footer-contact">⌖ Shri Krishna Furniture Mart, Alwar, Rajasthan 301001</p>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <button onClick={() => goTo('about')}>About Us</button>
            <button onClick={() => goTo('contact')}>Contact Us</button>
            <button onClick={() => goTo('catalog', { category: 'all' })}>All Products</button>
            <button onClick={() => goTo('home')}>Home</button>
          </div>

          <div className="footer-column">
            <h3>Shop</h3>
            <button onClick={() => goTo('catalog', { category: 'living-room' })}>Living Room</button>
            <button onClick={() => goTo('catalog', { category: 'dining' })}>Dining</button>
            <button onClick={() => goTo('catalog', { category: 'bedroom' })}>Bedroom</button>
            <button onClick={() => goTo('catalog', { category: 'storage' })}>Storage</button>
            <button onClick={() => goTo('catalog', { category: 'office-study' })}>Office &amp; Study</button>
            <button onClick={() => goTo('catalog', { category: 'outdoor-essentials' })}>Outdoor &amp; Essentials</button>
          </div>

          <div className="footer-column footer-newsletter">
            <h3>Subscribe to Our Newsletter</h3>
            <p>Get updates on new arrivals, offers, and design inspiration.</p>
            <form onSubmit={(event) => event.preventDefault()}>
              <input type="email" required placeholder="Enter your email address" aria-label="Email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 SmartCraft Furniture. All rights reserved.</span>
          <span>Secure Payments</span>
          <span>Easy Returns</span>
          <span>Pan-India Delivery</span>
          <span>No Cost EMI</span>
        </div>
      </footer>
    </>
  )
}
