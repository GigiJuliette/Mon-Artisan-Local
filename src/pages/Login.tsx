import { useState } from "react";
import { useLoginFetch } from "../hooks/useLoginFetch";
import { authService } from "../services/authService";
import type { User } from "../types/User";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

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
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            type="email"
            placeholder="exemple@gi-gi.dev"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={loading}
            required
          />
        </Field>
        <Field>
          <FieldLabel>Password</FieldLabel>
          <Input
            type="text"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            disabled={loading}
            required
          />
        </Field>
        {error && <span className="sec-clr">{error}</span>}
        <Button type="submit" variant="outline" disabled={loading}>
          {loading ? "Connexion en cours..." : "Se connecter"}
        </Button>
      </form>
    </>
  );
};
