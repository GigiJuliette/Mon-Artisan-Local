import { useState } from "react";

import { useSearchListings } from "@/hooks/useSearchListings";
import { SearchInput } from "@/components/custom/SearchInput/SearchInput";
import { Flower } from "@/components/custom/Flower/Flower";
import { ArtisanCard } from "@/components/custom/ArtisansCard/ArtisanCard";
import { Nav } from "@/components/custom/Nav/Nav";
const example = [
  {
    listing: {
      id: 1,
      title: "Updated Professional Plumbing Services",
      description:
        "Updated description: Experienced plumber offering professional plumbing services including repairs, installations, maintenance, and emergency services. Available 24/7 for both residential and commercial projects.",
      status: "waiting",
      userId: 2,
      createdAt: "2026-03-08T23:16:12.938Z",
      updatedAt: "2026-03-15T11:44:10.215Z",
      address: "2 impasse du pont du soleillet",
      city: "La Destrousse",
      user: {
        id: 2,
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        phone: "+33 7 83 73 34 06",
      },
      specialities: [
        {
          id: 1,
          name: "Plumbing",
        },
      ],
    },
  },
];
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
        {!loading && !error && results.length === 0 && <p>Aucun résultat.</p>}
        {example.map((listing) => (
          <ArtisanCard key={listing.listing.id} data={listing} />
        ))}
      </main>
    </>
  );
};
