import { useState, useMemo, useReducer } from 'react'
import { products } from './data/products'
import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import ProductCard from './components/ProductCard'
import Cart from './components/Cart'
import './App.css'

const cartInitialState = []

function cartReducer(state, action) {
  if (action.type === 'ADD') {
    const existing = state.find((item) => item.id === action.product.id)
    if (existing) {
      return state.map((item) =>
        item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item,
      )
    }
    return [
      ...state,
      { id: action.product.id, name: action.product.name, price: action.product.price, quantity: 1 },
    ]
  }
  if (action.type === 'REMOVE') {
    return state.filter((item) => item.id !== action.id)
  }
  if (action.type === 'UPDATE_QTY') {
    if (action.quantity < 1) {
      return state.filter((item) => item.id !== action.id)
    }
    return state.map((item) =>
      item.id === action.id ? { ...item, quantity: action.quantity } : item,
    )
  }
  return state
}

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, dispatchCart] = useReducer(cartReducer, cartInitialState)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const addToCart = (product) => {
    dispatchCart({ type: 'ADD', product })
  }

  const removeFromCart = (id) => {
    dispatchCart({ type: 'REMOVE', id })
  }

  const updateCartQty = (id, newQty) => {
    dispatchCart({ type: 'UPDATE_QTY', id, quantity: newQty })
  }

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    return products.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false
      if (maxPrice !== '' && !Number.isNaN(Number(maxPrice)) && p.price > Number(maxPrice)) return false
      if (selectedTags.length > 0) {
        const hasTag = selectedTags.some((tag) => p.tags && p.tags.includes(tag))
        if (!hasTag) return false
      }
      if (term) {
        const inName = p.name.toLowerCase().includes(term)
        const inCategory = p.category.toLowerCase().includes(term)
        const inTags = (p.tags || []).some((t) => t.toLowerCase().includes(term))
        if (!inName && !inCategory && !inTags) return false
      }
      return true
    })
  }, [selectedCategory, maxPrice, selectedTags, searchTerm])

  const toggleTag = (tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleRemoveFromProduct = (product) => {
    const existing = cartItems.find((item) => item.id === product.id)
    if (!existing) return
    const newQty = existing.quantity - 1
    if (newQty < 1) {
      dispatchCart({ type: 'REMOVE', id: product.id })
    } else {
      dispatchCart({ type: 'UPDATE_QTY', id: product.id, quantity: newQty })
    }
  }

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header onCartClick={() => setCartOpen(true)} cartCount={cartCount} />
      <main className="container flex-grow-1 py-3">
        <Nav />
        <div id="menu" className="row">
          <Sidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            selectedTags={selectedTags}
            onTagToggle={toggleTag}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <div className="col-12 col-md-8 col-lg-9">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
              {filteredProducts.map((product) => (
                <div key={product.id} className="col">
                  <ProductCard
                    product={product}
                    onAddToCart={addToCart}
                    onTagClick={toggleTag}
                    onRemoveFromCart={handleRemoveFromProduct}
                  />
                </div>
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <p className="text-muted text-center py-5">Aucun produit ne correspond aux filtres.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
      {cartOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={() => setCartOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setCartOpen(false)}
          role="button"
          tabIndex={0}
          aria-label="Fermer le panier"
        />
      )}
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQty={updateCartQty}
      />
    </div>
  )
}

export default App
