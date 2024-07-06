import React, { useState, ChangeEvent, FC } from "react";
import { useGetAllProductsQuery, useGetProductQuery } from "../redux/apis";
import "./css/data.css";

// Define types for the product and the API response
interface Product {
  id: number;
  title: string;
  price: number;
}

interface ProductData {
  data: {
    products :Product[];
  }
  isLoading:boolean;
  isError:boolean;
}

const Data: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: allProductsData, isLoading, isError } = useGetAllProductsQuery<ProductData>();
  const { data: singleProductData } = useGetProductQuery<ProductData>(searchQuery);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="data-container">
      <h2 className="data-title">Products List</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search products..."
        className="search-input"
      />
      {isError && <p className="error-message">Error loading products. Please try again.</p>}
      <ul className="product-list">
        {searchQuery ? (
          singleProductData?.products.map((product:Product) => (
            <li key={product.id} className="product-item">
              <span className="product-title">{product.title}</span>, price:{" "}
              <span className="product-price">{product.price}</span>
            </li>
          ))
        ) : (
          allProductsData?.products.map((product:Product) => (
            <li key={product.id} className="product-item">
              <span className="product-title">{product.title}</span>, price:{" "}
              <span className="product-price">{product.price}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Data;
