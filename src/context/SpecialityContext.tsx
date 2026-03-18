import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { specialityService } from "@/services/specialityService";
import type { Speciality } from "@/types/Specialitiy";

interface SpecialityContextValue {
  specialities: Speciality[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const SpecialityContext = createContext<SpecialityContextValue | undefined>(
  undefined,
);

export const SpecialityProvider = ({ children }: { children: ReactNode }) => {
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await specialityService.getAll();
      setSpecialities(data.specialities);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Impossible de charger les specialites");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const value = useMemo<SpecialityContextValue>(
    () => ({
      specialities,
      loading,
      error,
      refresh,
    }),
    [specialities, loading, error],
  );

  return (
    <SpecialityContext.Provider value={value}>
      {children}
    </SpecialityContext.Provider>
  );
};

export const useSpecialities = () => {
  const context = useContext(SpecialityContext);

  if (!context) {
    throw new Error("useSpecialities must be used within SpecialityProvider");
  }

  return context;
};
