import { useEffect, useState } from "react";

import { useSearchListings } from "@/hooks/useSearchListings";
import { useGeolocation } from "@/hooks/useGeolocation";
import type { Coordinates } from "@/hooks/useGeolocation";
import { SearchInput } from "@/components/custom/SearchInput/SearchInput";
import { ArtisanCard } from "@/components/custom/ArtisansCard/ArtisanCard";
import { Nav } from "@/components/custom/Nav/Nav";

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
      <main>
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
          results.length === 0 && <p>Aucun résultat.</p>}
        {Array.isArray(results) &&
          results.map((listing) => (
            <ArtisanCard key={listing.id} data={listing} />
          ))}
      </main>
    </>
  );
};
