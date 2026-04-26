import { useEffect, useState } from "react";

export function useProducts(query: string) {
  const [products, setProducts] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (!query) return;

    let isMounted = true;

    const fetchProducts = async () => {
      setStatus("loading");

      try {
        const res = await fetch(`/api/products?q=${query}`);

        if (!res.ok) throw new Error();

        const data = await res.json();

        if (isMounted) {
          setProducts(data);
          setStatus("success");
        }
      } catch {
        if (isMounted) {
          setStatus("error");
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [query]);

  return { products, status };
}