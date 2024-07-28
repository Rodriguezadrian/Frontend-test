import React, { useState, useEffect } from "react";

const Sidebar = ({ brands, onBrandSelect }) => {
  return (
    <div className="sidebar">
      <h2>Brands</h2>
      <ul>
        {brands.map((brand, index) => (
          <li key={index} onClick={() => onBrandSelect(brand)}>
            {brand}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProductFilter = ({ products }) => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(
      selectedBrand
        ? products.filter((product) => product.brand === selectedBrand)
        : products
    );
  }, [selectedBrand, products]);

  const uniqueBrands = [...new Set(products.map((product) => product.brand))];

  return (
    <div className="product-filter">
      <Sidebar brands={uniqueBrands} onBrandSelect={setSelectedBrand} />
      <div className="product-list">
      </div>
    </div>
  );
};

export default ProductFilter;
