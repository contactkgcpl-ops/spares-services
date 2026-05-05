export const PRODUCT_STORAGE_KEY = 'admin_products';
export const CATEGORY_OPTIONS = ['Food', 'Pharma', 'Beverage', 'FMCG', 'Cosmetics'];

const parseProducts = (value) => {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const getProducts = () => {
  const stored = localStorage.getItem(PRODUCT_STORAGE_KEY);
  return parseProducts(stored);
};

export const addProduct = (product) => {
  const products = getProducts();
  const newProduct = {
    id: product.id || Date.now().toString(),
    productName: product.productName?.trim() || '',
    description: product.description?.trim() || '',
    image: (product.image || '').trim(),
    category: product.category?.trim() || '',
    technicalDetails: product.technicalDetails?.trim() || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updatedProducts = [...products, newProduct];
  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(updatedProducts));
  return newProduct;
};

export const updateProduct = (id, updates) => {
  const products = getProducts();
  const updatedProducts = products.map((product) =>
    product.id === id
      ? {
          ...product,
          ...updates,
          productName: updates.productName?.trim() ?? product.productName,
          description: updates.description?.trim() ?? product.description,
          image: updates.image?.trim() ?? product.image,
          category: updates.category?.trim() ?? product.category,
          technicalDetails: updates.technicalDetails?.trim() ?? product.technicalDetails,
          updatedAt: new Date().toISOString(),
        }
      : product
  );

  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(updatedProducts));
  return updatedProducts.find((product) => product.id === id) || null;
};

export const deleteProduct = (id) => {
  const products = getProducts();
  const filteredProducts = products.filter((product) => product.id !== id);
  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(filteredProducts));
};

export const getProductById = (id) => getProducts().find((product) => product.id === id) || null;
