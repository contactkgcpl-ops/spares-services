export const normalizeSearch = (value) => value?.toString().toLowerCase().trim() || '';

// Fixed 4 main categories
export const MAIN_CATEGORIES = ['All', 'Pneumatic', 'Mechanical', 'Electronic', 'Electric'];

export const getCategoryList = () => MAIN_CATEGORIES;

export const getFeaturedProducts = (products) => products.slice(0, 4);

export const findProductById = (products, id) => products.find((product) => product.id === id);
