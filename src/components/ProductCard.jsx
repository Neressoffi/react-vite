import { useState } from 'react'
import Button from './Button'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'

function ProductCard({ product, onAddToCart, onTagClick, onRemoveFromCart, onOpenDetail }) {
  const [imgError, setImgError] = useState(false)
  const imgSrc = imgError ? FALLBACK_IMAGE : product.image

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={imgSrc}
        className="card-img-top object-fit-cover"
        alt={product.name}
        style={{ height: '180px' }}
        onError={() => setImgError(true)}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-primary fw-bold mb-2">{product.price} €</p>
        {product.tags?.length > 0 && (
          <div className="d-flex flex-wrap gap-1 mb-2">
            {product.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="btn btn-sm btn-outline-secondary rounded-pill"
                onClick={() => onTagClick && onTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
        <div className="mt-auto d-flex flex-column gap-2">
          <Button variant="outline-secondary" onClick={() => onOpenDetail && onOpenDetail(product)}>
            Voir le détail
          </Button>
          <Button onClick={() => onAddToCart(product)}>
            Ajouter au panier
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => onRemoveFromCart && onRemoveFromCart(product)}
          >
            Retirer du panier
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
