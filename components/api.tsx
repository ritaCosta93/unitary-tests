import { useState } from "react";

export default function Api () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("error");

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>

      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error logging in</p>}
      {status === "success" && <p>Welcome!</p>}
    </form>
  );
}