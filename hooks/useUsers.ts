import { useEffect, useState } from "react";

export function useUsers() {
  const [users, setUsers] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      setStatus("loading");

      try {
        const res = await fetch("/api/users");

        if (!res.ok) throw new Error();

        const data = await res.json();

        if (isMounted) {
          setUsers(data);
          setStatus("success");
        }
      } catch {
        if (isMounted) {
          setStatus("error");
        }
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return { users, status };
}