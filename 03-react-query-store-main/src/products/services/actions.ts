import { type Product, productsAPI } from "..";

interface GetProductsOptions {
  filterKey?: string;
}

export const sleep = (seconds:number = 0):Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000);
  })
};

export const getProducts = async({filterKey}:GetProductsOptions):Promise<Product[]> => {
  // await sleep(2);

  const filterURL = ( filterKey ) ? `category=${filterKey}`:'';
  const { data } = await productsAPI.get<Product[]>(`/products?${filterURL}`);

  return data;
};

export const getProductByID = async(id: number):Promise<Product> => {
  // await sleep(2);
  const { data } = await productsAPI.get<Product>(`/products/${id}`);

  return data;
};

interface ProductLike {
  id?:         number;
  title:       string;
  price:       number;
  description: string;
  category:    string;
  image:       string;
}

export const createProduct = async(product: ProductLike) => {
  await sleep(5);

  // Force error
  // throw new Error('Error creando un producto');

  const { data } = await productsAPI.post<ProductLike>(`/products`, product);
  return data;
}