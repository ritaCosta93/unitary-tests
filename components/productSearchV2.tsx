import { useState } from "react";
import { useDebouncedProducts } from "../hooks/useDebouncedProducts";

export default function ProductSearchV2() {
  const [input, setInput] = useState("");
  const { products, status } = useDebouncedProducts(input);

  return (
    <div>
      <input
        placeholder="Search products"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error fetching products</p>}

      {status === "success" && (
        <ul>
          {products.map((p, i) => (
            <li key={`${p}`[i]}>{p}</li>
          ))}
        </ul>
      )}
    </div>
  );
}