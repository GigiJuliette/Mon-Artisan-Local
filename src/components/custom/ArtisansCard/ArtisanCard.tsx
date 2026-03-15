import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ArtisanCardProps } from "./types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, MapPin, Phone } from "lucide-react";

export function ArtisanCard({ data }: ArtisanCardProps) {
  const {
    listing: { title, description, address, city, user, specialities },
  } = data;

  const mailto = `mailto:${user.email}`;
  const telto = user.phone ? `tel:${user.phone}` : undefined;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, ${city}`)}`;

  return (
    <Card size="default" className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <p className="mt-2 text-sm text-muted-foreground">
            {specialities?.map((s) => s.name).join(", ")}
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Détails</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>
                {user.firstName} {user.lastName}
              </DialogTitle>
              <DialogDescription className="[&>*]:w-full [&>*]:justify-start">
                <Button asChild variant="ghost">
                  <a href={mailto}>
                    <Mail size={15} />
                    <span>{user.email}</span>
                  </a>
                </Button>

                <Button asChild variant="ghost" disabled={!telto}>
                  <a href={telto ?? "#"}>
                    <Phone size={15} />
                    <span>{user.phone ?? "Telephone indisponible"}</span>
                  </a>
                </Button>

                <Button asChild variant="ghost">
                  <a href={mapsUrl} target="_blank" rel="noreferrer">
                    <MapPin size={15} />
                    <span>
                      {address}, <strong>{city}</strong>
                    </span>
                  </a>
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
