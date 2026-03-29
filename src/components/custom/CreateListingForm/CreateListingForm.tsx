import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useSpecialities } from "@/context/SpecialityContext";
import { createListing } from "@/services/listingService";
import { useServiceHandler } from "@/hooks/serviceHandler";
import { createListingSchema, type CreateListingValues } from "./zodSchema";

export const CreateListingForm = () => {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const { submit, loading, error } = useServiceHandler(createListing);
  const {
    specialities,
    loading: specialitiesLoading,
    error: specialitiesError,
  } = useSpecialities();

  const form = useForm<CreateListingValues>({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      title: "",
      description: "",
      address: "",
      city: "",
      phone: "",
      email: "",
      latitude: "",
      longitude: "",
      specialityIds: [],
    },
  });

  const onSubmit = async (data: CreateListingValues) => {
    setSuccessMessage("");
    const result = await submit(data, "Impossible de creer l'annonce");
    if (!result) {
      return;
    }
    setSuccessMessage("Annonce creee avec succes");
    form.reset();
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Creer une annonce</CardTitle>
        <CardDescription>
          Complete les informations pour publier ton service.
        </CardDescription>
      </CardHeader>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-4 flex flex-col gap-4"
      >
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="listing-title">Titre</FieldLabel>
              <Input
                {...field}
                id="listing-title"
                type="text"
                placeholder="Ex: Plombier disponible rapidement"
                aria-invalid={fieldState.invalid}
                disabled={form.formState.isSubmitting}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="listing-description">Description</FieldLabel>
              <Textarea
                {...field}
                id="listing-description"
                placeholder="Decris ton service"
                aria-invalid={fieldState.invalid}
                disabled={form.formState.isSubmitting}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="address"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="listing-address">Adresse</FieldLabel>
              <Input
                {...field}
                id="listing-address"
                type="text"
                placeholder="123 Rue Exemple"
                aria-invalid={fieldState.invalid}
                disabled={form.formState.isSubmitting}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="city"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="listing-city">Ville</FieldLabel>
              <Input
                {...field}
                id="listing-city"
                type="text"
                placeholder="Paris"
                aria-invalid={fieldState.invalid}
                disabled={form.formState.isSubmitting}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="listing-phone">Téléphone</FieldLabel>
                <Input
                  {...field}
                  id="listing-phone"
                  type="tel"
                  placeholder="06 12 34 56 78"
                  aria-invalid={fieldState.invalid}
                  disabled={form.formState.isSubmitting}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="listing-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="listing-email"
                  type="email"
                  placeholder="email@exemple.com"
                  aria-invalid={fieldState.invalid}
                  disabled={form.formState.isSubmitting}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="latitude"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="listing-latitude">Latitude</FieldLabel>
                <Input
                  {...field}
                  id="listing-latitude"
                  type="text"
                  placeholder="48.8566"
                  aria-invalid={fieldState.invalid}
                  disabled={form.formState.isSubmitting}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="longitude"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="listing-longitude">Longitude</FieldLabel>
                <Input
                  {...field}
                  id="listing-longitude"
                  type="text"
                  placeholder="2.3522"
                  aria-invalid={fieldState.invalid}
                  disabled={form.formState.isSubmitting}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        */}

        <Controller
          name="specialityIds"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Categories</FieldLabel>
              <div className="border rounded-lg p-3 flex flex-col gap-2">
                {specialitiesLoading && (
                  <p className="text-sm text-muted-foreground">
                    Chargement des specialites...
                  </p>
                )}

                {specialitiesError && (
                  <p className="text-sm text-destructive">
                    {specialitiesError}
                  </p>
                )}

                {!specialitiesLoading &&
                  !specialitiesError &&
                  specialities.map((speciality) => {
                    const checked = field.value.includes(speciality.id);

                    return (
                      <label
                        key={speciality.id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(event) => {
                            if (event.target.checked) {
                              field.onChange([...field.value, speciality.id]);
                            } else {
                              field.onChange(
                                field.value.filter(
                                  (id) => id !== speciality.id,
                                ),
                              );
                            }
                          }}
                          disabled={form.formState.isSubmitting}
                        />
                        {speciality.name}
                      </label>
                    );
                  })}
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
        {successMessage && (
          <p className="text-sm text-green-600">{successMessage}</p>
        )}

        <Button
          type="submit"
          variant="outline"
          disabled={
            form.formState.isSubmitting || specialitiesLoading || loading
          }
          className="self-end"
        >
          {form.formState.isSubmitting || loading
            ? "Creation..."
            : "Creer l'annonce"}
        </Button>
      </form>
    </Card>
  );
};
