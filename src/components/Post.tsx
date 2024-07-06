import React, { useState, FormEvent, ChangeEvent } from "react";
import { useAddProductMutation } from "../redux/apis";
import "./css/post.css";

interface NewProduct {
  title: string;
  price: number;
}

const Post: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const [addProduct] = useAddProductMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const newProduct: NewProduct = { title, price: parseFloat(price) };

      const result = await addProduct(newProduct).unwrap(); // Unwrap the result from the mutation

      setIsLoading(false);
      setSuccessMessage("Product added successfully!");

      setTitle("");
      setPrice("");
      setError("");
    } catch (error) {
      setIsLoading(false);
      setError("Failed to add product. Please try again.");
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  return (
    <div className="post-container">
      <h2 className="post-title">Add Product</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price" className="form-label">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={handlePriceChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Product"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default Post;
