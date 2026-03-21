import { useEffect, useState } from "react";

import { Nav } from "@/components/custom/Nav/Nav";
import { useSearchListings } from "@/hooks/useSearchListings";
import { useGeolocation } from "@/hooks/useGeolocation";
import type { Coordinates } from "@/hooks/useGeolocation";
import { SearchInput } from "@/components/custom/SearchInput/SearchInput";
import { ArtisanCard } from "@/components/custom/ArtisansCard/ArtisanCard";
import { Flower } from "lucide-react";

export const Home = () => {
  const [query, setQuery] = useState("");
  const [userCoordinates, setUserCoordinates] = useState<Coordinates | null>(
    null,
  );
  const { results, loading, error } = useSearchListings(query, userCoordinates);
  const {
    requestLocation,
    loading: locationLoading,
    error: locationError,
    permissionState,
  } = useGeolocation();

  const handleLocationSearch = async () => {
    if (userCoordinates !== null) {
      setUserCoordinates(null);
      return;
    }

    try {
      const coords = await requestLocation();
      setUserCoordinates(coords);
    } catch (err) {
      console.error("Location search failed:", err);
    }
  };

  useEffect(() => {
    console.log("RESULT", results);
  }, [results]);

  return (
    <>
      <Nav />
      <main className="p-6 flex flex-col items-center gap-20">
        <SearchInput
          query={query}
          setQuery={setQuery}
          onLocationSearch={handleLocationSearch}
          locationLoading={locationLoading}
          permissionState={permissionState}
          isLocationActive={userCoordinates !== null}
        />
        {loading && <p>Chargement...</p>}
        {error && <p>{error}</p>}
        {locationError && !locationError.includes("permission") && (
          <p>{locationError}</p>
        )}
        {!loading &&
          !locationLoading &&
          !error &&
          !locationError &&
          results.length === 0 && (
            <h1 className="text-lg">Découvrez les artisans autour de vous !</h1>
          )}
        {Array.isArray(results) &&
          results.map((listing) => (
            <ArtisanCard key={listing.id} data={listing} />
          ))}
      </main>
    </>
  );
};
