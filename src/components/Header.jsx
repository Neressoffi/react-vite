function Header({ onCartClick, cartCount }) {
  return (
    <header className="position-relative text-white text-center overflow-hidden rounded-bottom-3 mb-0">
      <div
        className="position-absolute top-0 start-0 w-100 h-100 bg-dark"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6)',
        }}
      />
      <div className="position-relative py-5 px-3">
        <h1 className="display-4 fw-bold mb-0">Mon Restaurant</h1>
        <button
          type="button"
          className="btn btn-link position-absolute top-0 end-0 m-3 text-white text-decoration-none d-flex align-items-center"
          onClick={onCartClick}
          aria-label="Ouvrir le panier"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          {cartCount > 0 && (
            <span className="badge bg-danger ms-1 rounded-pill">{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
