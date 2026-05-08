import { useMemo, useState } from 'react';
import { getCategoryList, normalizeSearch } from '../utils/productUtils';

function useProductFilter(products) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = useMemo(() => getCategoryList(products), [products]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);
    return products.filter((product) => {
      const productName = product.title || product.name || '';
      const matchesQuery = normalizeSearch(productName).includes(normalizedQuery);
      const matchesCategory = category === 'All' || product.category === category;
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
