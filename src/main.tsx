import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router";
import App from "./App";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Selection } from "./pages/Selection";
import { CreateListing } from "./pages/CreateListing";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { SpecialityProvider } from "./context/SpecialityContext";
import type { UserRole } from "./types/User";

const RequireAuth = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const RequireRole = ({
  allowedRoles,
}: {
  allowedRoles: Exclude<UserRole, null>[];
}) => {
  const { role, isAuthenticated } = useAuth();

  if (!isAuthenticated || !role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        element: <RequireAuth />,
        children: [
          { path: "create-annonce", element: <CreateListing /> },
          { path: "dashboard", element: <Dashboard /> },
        ],
      },
      {
        element: <RequireRole allowedRoles={["admin"]} />,
        children: [{ path: "selection", element: <Selection /> }],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <SpecialityProvider>
        <RouterProvider router={router} />
      </SpecialityProvider>
    </AuthProvider>
  </StrictMode>,
);
