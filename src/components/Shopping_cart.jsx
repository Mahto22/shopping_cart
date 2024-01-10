// Shopping_cart.js
import React, { useState } from "react";
import data from "../data.json";
import "./Shopping_cart.css";
import { FaShoppingCart } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";

function Shopping_cart() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (item) => {
    const updatedCart = cart.filter(
      (cartItem) => cartItem["Variant SKU"] !== item["Variant SKU"]
    );
    setCart(updatedCart);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const cartItemCount = cart.length;

  const filteredProducts = data.filter(
    (product) =>
      product["Variant SKU"].toLowerCase().includes(searchTerm.toLowerCase()) ||
      product["Title"].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Shopping Cart  <FaShoppingCart  /></h1>
      <div className="cart-container">
        <div className="cart-icon">
          <h3>
            Shopping Bag <FaBagShopping className="cart-bag" />
          </h3>
          
          {cartItemCount > 0 && <span className="badge">{cartItemCount}</span>}
        </div>
        <div className="cart cart-icon-2">
          {cartItemCount === 0 ? (
            <p>Cart is empty</p>
          ) : (
            <div className="cart-icon-2">
              {cart.map((item, index) => (
                <div
                  key={`${item["Variant SKU"]}-${index}`}
                  className="cart-item"
                >
                  <p>
                    <img src={item["Image Src"]} alt={item["Title"]} /> - $
                    {item["Variant Price"]}&nbsp;
                    <button onClick={() => removeFromCart(item)}>Remove</button>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <input
        type="text"
        placeholder="Search by SKU or Name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="product-list">
        {filteredProducts.map((product, index) => (
          <div
            key={`${product["Variant SKU"]} -${index}`}
            className="product-card"
          >
            <img src={product["Image Src"]} alt={product["Title"]} />
            <div className="product-info">
              <h3>{product["Title"]}</h3>
              <p>{product["Variant SKU"]}</p>
              <p>Price: ${product["Variant Price"]}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shopping_cart;
