import { useEffect, useRef, useState } from "react";

export function useDebouncedProducts(query: string) {
  const [products, setProducts] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!query) return;

    const timeout = setTimeout(() => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      const fetchProducts = async () => {
        setStatus("loading");

        try {
          const res = await fetch(`/api/products?q=${query}`, {
            signal: controller.signal,
          });

          if (!res.ok) throw new Error();

          const data = await res.json();

          setProducts(data);
          setStatus("success");
        } catch (err: any) {
          if (err.name === "AbortError") return;
          setStatus("error");
        }
      };

      fetchProducts();
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return { products, status };
}