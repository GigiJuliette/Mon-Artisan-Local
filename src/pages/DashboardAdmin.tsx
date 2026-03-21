import { useState } from "react";
import { Nav } from "@/components/custom/Nav/Nav";
import { SelectListing } from "@/components/custom/SelectListing/SelectListing";
import { CreateSpeciality } from "@/components/custom/CreateSpeciality/CreateSpeciality";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

type AdminTab = "listings" | "specialities";

export const DashboardAdmin = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>("listings");

  return (
    <>
      <Nav />
      <div className="p-6 flex flex-col gap-6">
        <section className="flex justify-center">
          <ButtonGroup>
            <Button
              variant={activeTab === "listings" ? "default" : "outline"}
              onClick={() => setActiveTab("listings")}
            >
              Modération des annonces
            </Button>
            <Button
              variant={activeTab === "specialities" ? "default" : "outline"}
              onClick={() => setActiveTab("specialities")}
            >
              Gestion des spécialités
            </Button>
          </ButtonGroup>
        </section>

        {activeTab === "listings" && <SelectListing />}
        {activeTab === "specialities" && (
          <div className="flex justify-center">
            <CreateSpeciality />
          </div>
        )}
      </div>
    </>
  );
};
