import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {Product,ProductResponse,SearchResponse} from '../types/products'

const getAuthToken = () => {
  return ""
};

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductResponse, void>({
      query: () => "products",
    }),
    getProduct: builder.query<SearchResponse, string>({
      query: (product) => `products/search?q=${product}`,
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (newProduct) => ({
        url: `products/add`,
        method: "POST",
        body: newProduct,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }),
      
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useAddProductMutation
} = productsApi;
