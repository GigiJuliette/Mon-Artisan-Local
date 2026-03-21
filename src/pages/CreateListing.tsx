import { CreateListingForm } from "@/components/custom/CreateListingForm/CreateListingForm";
import { Nav } from "@/components/custom/Nav/Nav";

export const CreateListing = () => {
  return (
    <>
      <Nav />
      <main className="p-6 grid place-items-center">
        <CreateListingForm />
      </main>
    </>
  );
};
