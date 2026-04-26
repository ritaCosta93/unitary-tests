import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e:any) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Invalid email");
      return;
    }

    if (password.length < 6) {
      setError("Password too short");
      return;
    }

    setError("");
    alert("Login successful");
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

      {error && <p>{error}</p>}
    </form>
  );
}