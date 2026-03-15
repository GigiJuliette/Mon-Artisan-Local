import { Link } from "react-router-dom";
import { Logo } from "../Logo";
import { Button } from "@/components/ui/button";
import { Flower } from "../Flower/Flower";

export const Nav = () => {
  return (
    <nav className="p-4 w-full flex justify-between mb-5 items-center">
      <Logo />
      <Flower size={70} />
      <Button asChild variant="outline">
        <Link to="/login">Se connecter</Link>
      </Button>
    </nav>
  );
};
