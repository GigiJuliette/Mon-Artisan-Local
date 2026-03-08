import { useState } from "react";
import { useLoginFetch } from "../hooks/useLoginFetch";
import { authService } from "../services/authService";
import type { User } from "../types/User";

export const Login = () => {
  const [formData, setFormData] = useState<User>({ email: "", password: "" });

  const { login, loading, error } = useLoginFetch(authService.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData);
  };

  if (loading) return <p>Loading..</p>;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={loading}
          required
        />
        <input
          type="text"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          disabled={loading}
          required
        />
        {error && <div>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Connexion en cours..." : "Se connecter"}
        </button>
      </form>
    </>
  );
};
