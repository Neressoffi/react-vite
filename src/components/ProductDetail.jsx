import { productDetails } from '../data/productDetails'
import Button from './Button'

function ProductDetail({ product, onClose, onAddToCart }) {
  if (!product) return null

  const details = productDetails[product.id] || {}
  const ingredients = product.tags || []
  const comments = details.comments || []

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-50" style={{ zIndex: 1100 }}>
      <div className="bg-white rounded-3 shadow-lg" style={{ maxWidth: '700px', width: '100%' }}>
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h5 className="mb-0">{product.name}</h5>
          <button type="button" className="btn-close" onClick={onClose} aria-label="Fermer" />
        </div>
        <div className="row g-0">
          <div className="col-12 col-md-5">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded-start"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="col-12 col-md-7">
            <div className="p-3 d-flex flex-column gap-3">
              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-secondary">{product.category}</span>
                  <span className="fw-bold text-primary">{product.price} €</span>
                </div>
              </div>
              <div>
                <h6 className="mb-2">Ingrédients</h6>
                {ingredients.length === 0 ? (
                  <p className="text-muted mb-0">Ingrédients non renseignés.</p>
                ) : (
                  <div className="d-flex flex-wrap gap-1">
                    {ingredients.map((tag) => (
                      <span key={tag} className="badge bg-light text-dark border">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h6 className="mb-2">Préparation</h6>
                <p className="mb-0 text-muted">{details.preparation || 'Préparation non renseignée.'}</p>
              </div>
              <div>
                <h6 className="mb-2">Commentaires</h6>
                {comments.length === 0 ? (
                  <p className="text-muted mb-0">Pas encore de commentaires pour ce produit.</p>
                ) : (
                  <ul className="mb-0 ps-3">
                    {comments.map((comment, index) => (
                      <li key={index} className="mb-1">
                        {comment}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="d-flex gap-2 justify-content-end">
                <Button variant="outline-secondary" onClick={onClose}>
                  Fermer
                </Button>
                <Button onClick={() => onAddToCart(product)}>
                  Ajouter au panier
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

