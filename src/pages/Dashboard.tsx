import { Nav } from "@/components/custom/Nav/Nav";

export const Dashboard = () => {
  return (
    <>
      <Nav />
      <main className="p-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenue sur votre espace utilisateur.
        </p>
      </main>
    </>
  );
};
