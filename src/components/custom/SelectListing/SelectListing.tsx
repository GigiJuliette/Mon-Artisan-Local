import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  getAllListingsForAdmin,
  updateListingAdminStatus,
} from "@/services/listingService";
import { useFetch } from "@/hooks/useFetch";
import { useServiceHandler } from "@/hooks/serviceHandler";

type ListingFilter = "waiting" | "published" | "blocked" | "all";
type ModerationStatus = "published" | "blocked";

const wait = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export const SelectListing = () => {
  const { data, loading } = useFetch(getAllListingsForAdmin);
  const {
    submit,
    loading: submitting,
    error: submitError,
  } = useServiceHandler(updateListingAdminStatus);

  const [activeFilter, setActiveFilter] = useState<ListingFilter>("waiting");
  const [activeIndex, setActiveIndex] = useState(0);
  const [statusOverrides, setStatusOverrides] = useState<
    Record<number, string>
  >({});
  const [activeModeration, setActiveModeration] = useState<{
    listingId: number;
    status: ModerationStatus;
  } | null>(null);

  const listings = useMemo(() => {
    const serverListings = data?.listings ?? [];

    return serverListings.map((listing) => ({
      ...listing,
      status: statusOverrides[listing.id] ?? listing.status,
    }));
  }, [data, statusOverrides]);

  const filteredListings = useMemo(() => {
    if (activeFilter === "all") {
      return listings;
    }

    return listings.filter((listing) => listing.status === activeFilter);
  }, [activeFilter, listings]);

  const currentListing = filteredListings[activeIndex];

  const stats = useMemo(
    () => ({
      all: listings.length,
      waiting: listings.filter((listing) => listing.status === "waiting")
        .length,
      published: listings.filter((listing) => listing.status === "published")
        .length,
      blocked: listings.filter((listing) => listing.status === "blocked")
        .length,
    }),
    [listings],
  );

  const handleChangeFilter = (filter: ListingFilter) => {
    setActiveFilter(filter);
    setActiveIndex(0);
  };

  const handlePrevious = () => {
    setActiveIndex((current) => Math.max(current - 1, 0));
  };

  const handleNext = () => {
    setActiveIndex((current) =>
      Math.min(current + 1, Math.max(filteredListings.length - 1, 0)),
    );
  };

  const handleModeration = async (status: ModerationStatus) => {
    if (!currentListing) {
      return;
    }

    setActiveModeration({ listingId: currentListing.id, status });
    await wait(450);

    const result = await submit(
      { id: currentListing.id, status },
      "Impossible de mettre a jour ce listing",
    );

    if (!result) {
      setActiveModeration(null);
      return;
    }

    setStatusOverrides((previous) => ({
      ...previous,
      [currentListing.id]: status,
    }));

    setTimeout(() => {
      setActiveModeration((current) =>
        current?.listingId === currentListing.id ? null : current,
      );
    }, 700);
  };

  const statusColorClass =
    currentListing?.status === "published"
      ? "text-green-600"
      : currentListing?.status === "blocked"
        ? "text-red-600"
        : "";

  return (
    <div className="flex flex-col gap-6 items-center">
      <section className="flex flex-col gap-3 items-center">
        <p className="text-muted-foreground">
          Moderez les annonces artisan et validez-les une par une.
        </p>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeFilter === "waiting" ? "default" : "outline"}
            onClick={() => handleChangeFilter("waiting")}
          >
            En attente ({stats.waiting})
          </Button>
          <Button
            variant={activeFilter === "published" ? "default" : "outline"}
            onClick={() => handleChangeFilter("published")}
          >
            Publies ({stats.published})
          </Button>
          <Button
            variant={activeFilter === "blocked" ? "default" : "outline"}
            onClick={() => handleChangeFilter("blocked")}
          >
            Bloques ({stats.blocked})
          </Button>
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            onClick={() => handleChangeFilter("all")}
          >
            Tous ({stats.all})
          </Button>
        </div>
      </section>

      {loading && <p>Chargement des listings...</p>}

      {!loading && filteredListings.length === 0 && (
        <p>Aucun listing dans ce filtre.</p>
      )}

      {!loading && currentListing && (
        <Card
          className={`w-full max-w-3xl transition-colors ${
            activeModeration?.listingId === currentListing.id
              ? activeModeration.status === "published"
                ? "animate-pulse ring-green-500/60 bg-green-500/5"
                : "animate-pulse ring-red-500/60 bg-red-500/5"
              : ""
          }`}
        >
          <CardHeader>
            <CardTitle>{currentListing.title}</CardTitle>
            <CardDescription className={statusColorClass}>
              Statut actuel: {currentListing.status}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">
            <p>{currentListing.description}</p>
            <p>
              Artisan: {currentListing.user.firstName}{" "}
              {currentListing.user.lastName} ({currentListing.user.email})
            </p>
            <p>
              Localisation: {currentListing.address}, {currentListing.city}
            </p>
            <p>
              Specialites:{" "}
              {currentListing.specialities
                .map((item) => item.name)
                .join(", ") || "Aucune"}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {currentListing.status !== "published" && (
                <Button
                  type="button"
                  onClick={() => handleModeration("published")}
                  disabled={
                    submitting ||
                    activeModeration?.listingId === currentListing.id
                  }
                >
                  Approuver
                </Button>
              )}
              {currentListing.status !== "blocked" && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleModeration("blocked")}
                  disabled={
                    submitting ||
                    activeModeration?.listingId === currentListing.id
                  }
                >
                  Desapprouver
                </Button>
              )}
            </div>

            {submitError && <p className="text-destructive">{submitError}</p>}

            <div className="flex items-center justify-between pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={activeIndex === 0}
              >
                Precedent
              </Button>
              <p className="text-sm text-muted-foreground">
                {activeIndex + 1} / {filteredListings.length}
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={handleNext}
                disabled={activeIndex >= filteredListings.length - 1}
              >
                Suivant
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
