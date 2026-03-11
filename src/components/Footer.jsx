function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-dark text-white text-center py-3 mt-4 rounded-top-3">
      <p className="mb-0 small">© {currentYear} Mon Restaurant. Tous droits réservés.</p>
    </footer>
  )
}

export default Footer
