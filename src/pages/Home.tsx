import { useState } from "react";

import { useSearchListings } from "@/hooks/useSearchListings";
import { SearchInput } from "@/components/custom/SearchInput/SearchInput";
import { ArtisanCard } from "@/components/custom/ArtisansCard/ArtisanCard";
import { Nav } from "@/components/custom/Nav/Nav";

export const Home = () => {
  const [query, setQuery] = useState("");
  const { results, loading, error } = useSearchListings(query);

  return (
    <>
      <Nav />
      <main>
        <SearchInput query={query} setQuery={setQuery} />
        {loading && <p>Chargement...</p>}
        {error && <p>{error}</p>}
        {results && !loading && !error && results.listings.length === 0 && (
          <p>Aucun résultat.</p>
        )}
        {results?.listings.map((listing) => (
          <ArtisanCard key={listing.listing.id} data={listing} />
        ))}
      </main>
    </>
  );
};
