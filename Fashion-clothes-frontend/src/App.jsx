import { Routes, Route, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from './features/cart/cartSlice'
import CartPage from './features/cart/components/CartPage'
import CheckoutPage from './features/checkout/components/CheckoutPage'
import ConfirmationPage from './features/checkout/components/ConfirmationPage'
import './App.css'

const sampleProducts = [
  { id: 1, name: 'Classic T-Shirt', price: 25.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop' },
  { id: 2, name: 'Denim Jeans', price: 79.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop' },
  { id: 3, name: 'White Sneakers', price: 129.99, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop' },
  { id: 4, name: 'Leather Jacket', price: 199.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop' },
  { id: 5, name: 'Summer Dress', price: 89.99, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop' },
  { id: 6, name: 'Casual Hoodie', price: 59.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop' }
]

function HomePage() {
  const dispatch = useDispatch()

  return (
    <div>
      <h1>Fashion Store</h1>
      <div className="products">
        {sampleProducts.map(product => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button onClick={() => dispatch(addToCart(product))}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </div>
  )
}

export default App
