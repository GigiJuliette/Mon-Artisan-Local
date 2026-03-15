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

import { authService } from "@/services/authService";
import { registerFormSchema } from "./zodSchema";
import type { RegisterValues } from "./zodSchema";
import { useRegisterFetch } from "@/components/custom/RegisterForm/useRegisterfetch";
import { Link } from "react-router-dom";

export const RegisterForm = () => {
  const { register, loading, error } = useRegisterFetch(authService.register);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterValues) => {
    await register(data);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Already have an account ?{" "}
          <Button variant="link" className="p-0">
            <Link to="/login"> Log in</Link>
          </Button>
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-4 flex flex-col gap-4"
      >
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                {...field}
                id="name"
                type="text"
                placeholder="ex : Juliette"
                aria-invalid={fieldState.invalid}
                disabled={loading}
                autoComplete="given-name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="surname"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="surname">Surname</FieldLabel>
              <Input
                {...field}
                id="surname"
                type="text"
                placeholder="ex : De Meo"
                aria-invalid={fieldState.invalid}
                disabled={loading}
                autoComplete="fanily-name"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
          {loading ? "Loading..." : "Register"}
        </Button>
      </form>
    </Card>
  );
};
