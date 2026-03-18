import type { PermissionState } from "@/hooks/useGeolocation";

export type SearchInputProps = {
  query: string;
  setQuery: (value: string) => void;
  onLocationSearch?: () => void;
  locationLoading?: boolean;
  permissionState?: PermissionState;
  isLocationActive?: boolean;
};
