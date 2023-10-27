import { type Product, productsAPI } from "..";

interface GetProductsOptions {
  filterKey?: string;
}

const sleep = (seconds:number = 0):Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000);
  })
};

export const getProducts = async({filterKey}:GetProductsOptions):Promise<Product[]> => {
  await sleep(2);

  const filterURL = ( filterKey ) ? `category=${filterKey}`:'';
  const { data } = await productsAPI.get<Product[]>(`/products?${filterURL}`);

  return data;
};

export const getProductByID = async(id: number):Promise<Product> => {
  // await sleep(2);
  const { data } = await productsAPI.get<Product>(`/products/${id}`);

  return data;
};