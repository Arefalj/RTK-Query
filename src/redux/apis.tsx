import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {Product,ProductResponse,SearchResponse} from '../types/products'


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
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useAddProductMutation
} = productsApi;
