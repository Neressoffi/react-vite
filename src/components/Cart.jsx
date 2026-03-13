import Button from './Button'

function Cart({ isOpen, onClose, items, onRemove, onUpdateQty, onCheckout }) {
  if (!isOpen) return null

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="position-fixed top-0 end-0 h-100 bg-white shadow-lg overflow-auto" style={{ width: '320px', zIndex: 1050 }}>
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5 className="mb-0">Panier</h5>
        <button type="button" className="btn-close" onClick={onClose} aria-label="Fermer" />
      </div>
      <div className="p-3">
        {items.length === 0 ? (
          <p className="text-muted">Votre panier est vide.</p>
        ) : (
          <>
            <ul className="list-unstyled mb-0">
              {items.map((item) => (
                <li key={item.id} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                  <div>
                    <strong>{item.name}</strong>
                    <div className="small text-muted">
                      {item.price} € × {item.quantity}
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger ms-1"
                      onClick={() => onRemove(item.id)}
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <p className="fw-bold mt-3 mb-2">Total : {total.toFixed(2)} €</p>
            <Button className="w-100" onClick={onCheckout}>
              Commander
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
