export const normalizeSearch = (value) => value?.toString().toLowerCase().trim() || '';

export const getCategoryList = (products) => {
  const categories = products.map((product) => product.category);
  return ['All', ...new Set(categories)];
};

export const getFeaturedProducts = (products) => products.slice(0, 4);

export const findProductById = (products, id) => products.find((product) => product.id === id);
