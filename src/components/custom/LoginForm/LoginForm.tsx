import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useLoginFetch } from "@/components/custom/LoginForm/useLoginFetch";
import { authService } from "@/services/authService";
import { loginFormSchema } from "./zodSchema";
import type { LoginValues } from "./zodSchema";
import { Link } from "react-router";

export const LoginForm = () => {
  const { login, loading, error } = useLoginFetch(authService.login);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginValues) => {
    await login(data);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Don't have an account yet ?{" "}
          <Button variant="link" className="p-0">
            <Link to="/register">Sign in</Link>
          </Button>
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-4 flex flex-col gap-4"
      >
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-email">Email</FieldLabel>
              <Input
                {...field}
                id="login-email"
                type="email"
                placeholder="exemple@gi-gi.dev"
                aria-invalid={fieldState.invalid}
                disabled={loading}
                autoComplete="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-password">Password</FieldLabel>
              <Input
                {...field}
                id="login-password"
                type="password"
                placeholder="Password"
                aria-invalid={fieldState.invalid}
                disabled={loading}
                autoComplete="current-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {error && <span>{error}</span>}
        <Button
          type="submit"
          variant="outline"
          disabled={loading}
          className="self-end"
        >
          {loading ? "Loading..." : "Log In"}
        </Button>
      </form>
    </Card>
  );
};
