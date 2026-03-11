import SidebarBlock from './SidebarBlock'
import { categories, allTags } from '../data/products'

function Sidebar({
  selectedCategory,
  onCategoryChange,
  maxPrice,
  onMaxPriceChange,
  selectedTags,
  onTagToggle,
  searchTerm,
  onSearchChange,
}) {
  return (
    <aside className="col-12 col-md-4 col-lg-3">
      <SidebarBlock title="Recherche">
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Rechercher par titre, catégorie ou mot clé"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </SidebarBlock>

      <SidebarBlock title="Catégorie">
        <div className="d-flex flex-column gap-2">
          <button
            type="button"
            className={`btn btn-sm ${selectedCategory === '' ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => onCategoryChange('')}
          >
            Toutes
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`btn btn-sm text-start ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </SidebarBlock>

      <SidebarBlock title="Filtrer par prix">
        <div className="input-group input-group-sm">
          <span className="input-group-text">€</span>
          <input
            type="number"
            className="form-control"
            placeholder="Prix max"
            min="0"
            step="1"
            value={maxPrice === '' ? '' : maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
          />
        </div>
      </SidebarBlock>

      <SidebarBlock title="Ingrédients / Tags">
        <div className="d-flex flex-wrap gap-1">
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`btn btn-sm rounded-pill ${selectedTags.includes(tag) ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => onTagToggle(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </SidebarBlock>
    </aside>
  )
}

export default Sidebar
