import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useServiceHandler } from "../../../hooks/serviceHandler";
import { specialityService } from "@/services/specialityService";

const createSpecialitySchema = z.object({
  name: z.string().min(2, "Le nom de la spécialité est requis"),
});

type CreateSpecialityValues = z.infer<typeof createSpecialitySchema>;

export const CreateSpeciality = () => {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { submit, loading, error } = useServiceHandler(
    specialityService.create,
  );

  const form = useForm<CreateSpecialityValues>({
    resolver: zodResolver(createSpecialitySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CreateSpecialityValues) => {
    setSuccessMessage("");

    const result = await submit(data, "Impossible de creer la specialite");

    if (!result) {
      return;
    }

    setSuccessMessage(result.message);
    form.reset();
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Créer une spécialité</CardTitle>
        <CardDescription>
          Ajoutez une nouvelle spécialité aux artisans.
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
              <FieldLabel htmlFor="speciality-name">Nom</FieldLabel>
              <Input
                {...field}
                id="speciality-name"
                type="text"
                placeholder="Ex: Plomberie"
                aria-invalid={fieldState.invalid}
                disabled={loading}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {successMessage && (
          <p className="text-sm text-green-600">{successMessage}</p>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" disabled={loading} className="self-end">
          {loading ? "Création..." : "Créer"}
        </Button>
      </form>
    </Card>
  );
};
