import { useMemo, useState } from 'react';
import { getCategoryList, normalizeSearch } from '../utils/productUtils';

function useProductFilter(products) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = useMemo(() => getCategoryList(products), [products]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);
    const normalizedCategory = normalizeSearch(category);
    return products.filter((product) => {
      const productName = product.title || product.name || '';
      const matchesQuery = normalizedQuery === '' || normalizeSearch(productName).includes(normalizedQuery);
      const matchesCategory = normalizedCategory === 'all' || normalizeSearch(product.category) === normalizedCategory;
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
