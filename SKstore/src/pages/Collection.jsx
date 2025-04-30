import React, { useContext, useEffect, useState, useCallback } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { Title } from '../components/Title'
import { ProductItem } from '../components/ProductItem'

export const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState(new Set())
  const [subCategory, setSubCategory] = useState(new Set())
  const [sortType, setSortType] = useState('relevant')
  const [isLoading, setIsLoading] = useState(false)

  // Toggle helper for Sets
  const toggleSet = (value, setter) => {
    setter(prev => {
      const next = new Set(prev)
      next.has(value) ? next.delete(value) : next.add(value)
      return next
    })
  }
  const toggleCategory = e => toggleSet(e.target.value, setCategory)
  const toggleSubCategory = e => toggleSet(e.target.value, setSubCategory)

  // Compute relevance: lower index = more relevant
  const getRelevance = item => {
    if (!showSearch || !search) return Infinity
    const term = search.toLowerCase()
    const fields = [item.name, item.category, item.subCategory]
    return Math.min(
      ...fields.map(str => {
        const idx = str.toLowerCase().indexOf(term)
        return idx === -1 ? Infinity : idx
      })
    )
  }

  // Filter & sort callback
  const computeFiltered = useCallback(() => {
    let result = [...products]

    // Search filter
    if (showSearch && search) {
      const term = search.toLowerCase()
      result = result.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.subCategory.toLowerCase().includes(term)
      )
    }

    // Category filter
    if (category.size) {
      result = result.filter(item => category.has(item.category))
    }

    // SubCategory filter
    if (subCategory.size) {
      result = result.filter(item => subCategory.has(item.subCategory))
    }

    // Sorting
    switch (sortType) {
      case 'low-high':
        result.sort((a, b) => a.price - b.price)
        break
      case 'high-low':
        result.sort((a, b) => b.price - a.price)
        break
      default:
        // relevant
        if (showSearch && search) {
          result.sort((a, b) => getRelevance(a) - getRelevance(b))
        }
        break
    }

    return result
  }, [products, search, showSearch, category, subCategory, sortType])

  // Sync filtered results
  useEffect(() => {
    setIsLoading(true)
    const result = computeFiltered()
    setFilterProducts(result)
    setIsLoading(false)
  }, [computeFiltered])

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t">
      {/* Filter Panel */}
      <aside className="min-w-[240px]">
        <button
          onClick={() => setShowFilter(prev => !prev)}
          className="my-2 text-xl flex items-center gap-2"
        >
          FILTERS
          <img
            className={`h-4 sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="Toggle filters"
          />
        </button>

        <div className={`${showFilter ? 'block' : 'hidden'} sm:block space-y-6`}>
          {/* Categories */}
          <div className="border p-4">
            <p className="mb-2 font-medium uppercase">Categories</p>
            {['Men', 'Women', 'Kids'].map(cat => (
              <label key={cat} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  value={cat}
                  checked={category.has(cat)}
                  onChange={toggleCategory}
                  className="w-4 h-4"
                />
                {cat}
              </label>
            ))}
          </div>

          {/* Sub-Categories */}
          <div className="border p-4">
            <p className="mb-2 font-medium uppercase">Type</p>
            {['Topwear', 'Bottomwear', 'Co-ords'].map(type => (
              <label key={type} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  value={type}
                  checked={subCategory.has(type)}
                  onChange={toggleSubCategory}
                  className="w-4 h-4"
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Products Section */}
      <section className="flex-1">
        <div className="flex justify-between items-center py-2">
          <Title text1="All" text2="Collections" />
          <select
            value={sortType}
            onChange={e => setSortType(e.target.value)}
            className="border px-3 py-1 text-sm"
          >
            <option value="relevant">Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10 text-gray-500">Loading...</div>
        ) : filterProducts.length === 0 ? (
          <p className="py-10 text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filterProducts.map(item => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                images={item.images}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
