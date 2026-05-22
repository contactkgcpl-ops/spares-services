import { useMemo, useState } from 'react';
import { normalizeSearch } from '../utils/productUtils';

// Fixed 4 main categories — always shown regardless of product data
const MAIN_CATEGORIES = ['All', 'Pneumatic', 'Mechanical', 'Electronic', 'Electric'];

function useProductFilter(products) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  // Always return the fixed category list
  const categories = MAIN_CATEGORIES;

  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);
    const normalizedCategory = normalizeSearch(category);

    return products.filter((product) => {
      if (!product || !product.id) return false;

      const productName = String(product.title || product.name || '').trim();
      const productCategory = String(product.category || '').trim();

      const matchesQuery = normalizedQuery === '' || normalizeSearch(productName).includes(normalizedQuery);
      const matchesCategory = normalizedCategory === 'all' || normalizeSearch(productCategory) === normalizedCategory;

      return matchesQuery && matchesCategory;
    });
  }, [category, products, query]);

  return {
    category,
    categories,
    filteredProducts,
    query,
    setCategory,
    setQuery
  };
}

export default useProductFilter;
