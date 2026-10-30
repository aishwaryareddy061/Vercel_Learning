
import { useState } from 'react'
import './App.css'

const products = [
  { id: 1, name: 'Fresh Apples', price: 120, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600' },
  { id: 2, name: 'Bananas', price: 60, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600' },
  { id: 3, name: 'Fresh Mangoes', price: 100, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600' },
  { id: 4, name: 'Broccoli', price: 80, image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=600' },
  { id: 5, name: 'Strawberries', price: 150, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600' },
  { id: 6, name: 'Fresh Milk', price: 70, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600' }
]

function App() {
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState('')
  const [help, setHelp] = useState(false)
  const [checkout, setCheckout] = useState(false)
  const [message, setMessage] = useState('')

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id)

      if (found) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prev, { ...product, quantity: 1 }]
    })

    setMessage(`${product.name} added to cart!`)
  }

  const updateQuantity = (id, amount) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + amount }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  )

  const buyNow = (product) => {
    addToCart(product)
    setCheckout(true)
    setTimeout(() => {
      document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const filteredProducts = products.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <nav className="navbar">
        <a href="#home" className="logo">🌿 PureMart</a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#footer">About</a>
          <a href="#footer">Contact</a>
        </div>

        <input
          className="search"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <button className="cart-nav"
          onClick={() => document.getElementById('cart').scrollIntoView()}>
          🛒 Cart ({cartCount})
        </button>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span>GOOD FOOD • BETTER YOU</span>
            <h1>Fresh Food,<br />
              <strong>Better Living.</strong>
            </h1>
            <p>Discover fresh and organic products every day.</p>
            <button onClick={() =>
              document.getElementById('products').scrollIntoView()}>
              Shop Now →
            </button>
          </div>
        </section>

        <section className="benefits">
          <div>🌿 <span><b>100% Organic</b><small>Pure & Natural</small></span></div>
          <div>🚚 <span><b>Fast Delivery</b><small>Fresh to your door</small></span></div>
          <div>🛡️ <span><b>Secure Payment</b><small>Safe & Reliable</small></span></div>
          <div>🎧 <span><b>24/7 Support</b><small>We're here to help</small></span></div>
        </section>

        <section className="product-section" id="products">
          <div className="section-title">
            <h2>Our Products</h2>
            <span>{filteredProducts.length} products</span>
          </div>

          <div className="product-grid">
            {filteredProducts.map(product => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>Fresh & Organic</p>
                  <h3 className="price">₹{product.price}</h3>

                  <div className="product-actions">
                    <button onClick={() => addToCart(product)}>
                      🛒 Add to Cart
                    </button>
                    <button className="buy-btn"
                      onClick={() => buyNow(product)}>
                      Buy Now
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="empty">No products found.</p>
          )}
        </section>

        <section className="cart-section" id="cart">
          <h2>🛒 Your Shopping Cart</h2>

          {cart.length === 0 ? (
            <p className="empty">Your cart is empty. Start shopping!</p>
          ) : (
            <>
              <div className="cart-table">
                <div className="cart-heading">
                  <span>Product</span>
                  <span>Price</span>
                  <span>Quantity</span>
                  <span>Total</span>
                  <span>Action</span>
                </div>

                {cart.map(item => (
                  <div className="cart-row" key={item.id}>
                    <div className="cart-product">
                      <img src={item.image} alt={item.name} />
                      {item.name}
                    </div>

                    <span>₹{item.price}</span>

                    <div className="quantity">
                      <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                      {item.quantity}
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>

                    <b>₹{item.price * item.quantity}</b>

                    <button className="remove"
                      onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-total">
                <h3>Total: ₹{total}</h3>
                <button onClick={() => setCheckout(true)}>
                  Proceed to Checkout →
                </button>
              </div>
            </>
          )}
        </section>

        {checkout && (
          <section className="checkout" id="checkout">
            <h2>Checkout</h2>
            {cart.map(item => (
              <p key={item.id}>
                {item.name} × {item.quantity} — ₹{item.price * item.quantity}
              </p>
            ))}
            <h3>Order Total: ₹{total}</h3>
            <button disabled={!cart.length} onClick={() => {
              setCart([])
              setCheckout(false)
              setMessage('Demo order placed successfully!')
              document.getElementById('home').scrollIntoView()
            }}>
              Place Demo Order
            </button>
            <button className="cancel"
              onClick={() => setCheckout(false)}>Cancel</button>
            <small>Demo checkout only. No real payment is collected.</small>
          </section>
        )}
      </main>

      {message && (
        <div className="toast">
          ✓ {message}
          <button onClick={() => setMessage('')}>×</button>
        </div>
      )}

      <footer id="footer">
        <h2>🌿 PureMart</h2>
        <p>Fresh • Healthy • Organic</p>
        <p>Home　 Products　 About　 Contact</p>
        <small>© 2026 PureMart. All rights reserved.</small>
      </footer>

      <button className="help-button" onClick={() => setHelp(!help)}>
        💬 Help
      </button>

      {help && (
        <div className="help-panel">
          <button className="help-close" onClick={() => setHelp(false)}>×</button>
          <h3>How can we help?</h3>
          <p>Need assistance? We're here for you!</p>
          <a href="mailto:support@puremart.example">
            ✉ Email Support
          </a>
          <button onClick={() => {
            setHelp(false)
            document.getElementById('cart').scrollIntoView()
          }}>
            View My Cart
          </button>
        </div>
      )}
    </>
  )
}

export default App
