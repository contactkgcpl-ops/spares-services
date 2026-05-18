// Mock data storage using localStorage
const STORAGE_KEY = 'admin_products';

export const initMockProducts = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
};

export const getMockProducts = () => {
  initMockProducts();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

export const addMockProduct = (product) => {
  initMockProducts();
  const products = getMockProducts();
  const newProduct = {
    ...product,
    _id: 'local_' + Date.now(),
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  return newProduct;
};

export const updateMockProduct = (id, updates) => {
  initMockProducts();
  const products = getMockProducts();
  const index = products.findIndex(p => p._id === id);
  if (index >= 0) {
    products[index] = { ...products[index], ...updates, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return products[index];
  }
  throw new Error('Product not found');
};

export const deleteMockProduct = (id) => {
  initMockProducts();
  const products = getMockProducts();
  const filtered = products.filter(p => p._id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return { success: true };
};

export const getMockProductById = (id) => {
  initMockProducts();
  const products = getMockProducts();
  return products.find(p => p._id === id);
};
