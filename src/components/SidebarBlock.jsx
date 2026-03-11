function SidebarBlock({ title, children }) {
  return (
    <div className="mb-4">
      <div className="bg-secondary text-white px-3 py-2 rounded-top small fw-bold">
        {title}
      </div>
      <div className="border border-secondary border-top-0 rounded-bottom p-3 bg-light">
        {children}
      </div>
    </div>
  )
}

export default SidebarBlock
