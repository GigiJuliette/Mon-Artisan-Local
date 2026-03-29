import { Link } from "react-router-dom";
import { Logo } from "../Logo";
import { Button } from "@/components/ui/button";
import { Flower } from "../Flower/Flower";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router";
import { ButtonGroup } from "@/components/ui/button-group";

export const Nav = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="p-4 w-full mb-5 grid grid-cols-3 items-center">
      <Logo />
      <div className="justify-self-center">
        <Flower size={70} />
      </div>
      {isAuthenticated ? (
        <ButtonGroup className="justify-self-end">
          <Button asChild variant="outline">
            <Link to="/create-annonce">Creer une annonce</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/dashboard">Dashboard</Link>
          </Button>
          <Button type="button" variant="outline" onClick={handleLogout}>
            Se deconnecter
          </Button>
        </ButtonGroup>
      ) : (
        <Button asChild variant="outline">
          <Link to="/login">Se connecter</Link>
        </Button>
      )}
    </nav>
  );
};
