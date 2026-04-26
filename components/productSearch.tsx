// ProductSearch.tsx
import { useState } from "react";
import { useProducts } from "../hooks/useProducts";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");

  const { products, status } = useProducts(query);

  const handleSearch = () => {
    setQuery(input);
  };

  return (
    <div>
      <input
        placeholder="Search products"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button type="button" onClick={handleSearch}>Search</button>

      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error fetching products</p>}

      {status === "success" && (
        <ul>
          {products.length === 0 ? (
            <p>No products found</p>
          ) : (
            products.map((p, i) => <li key={`${p[i]}`}>{p}</li>)
          )}
        </ul>
      )}
    </div>
  );
}