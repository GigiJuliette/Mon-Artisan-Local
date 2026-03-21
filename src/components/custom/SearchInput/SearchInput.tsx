import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SearchInputProps } from "./types";

export const SearchInput = ({
  query,
  setQuery,
  onLocationSearch,
  locationLoading = false,
  permissionState = "prompt",
  isLocationActive = false,
}: SearchInputProps) => {
  const getButtonVariant = () => {
    if (isLocationActive) {
      return "default";
    }
    switch (permissionState) {
      case "denied":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getButtonTitle = () => {
    if (isLocationActive) {
      return "Using your location - click to disable";
    }

    switch (permissionState) {
      case "granted":
        return "Click to search around you";
      case "denied":
        return "Location access denied - click to try again";
      case "unsupported":
        return "Geolocation not supported by your browser";
      default:
        return "Click to allow location access";
    }
  };

  return (
    <div className="flex gap-2 items-center w-full max-w-lg">
      <InputGroup className="w-full">
        <InputGroupInput
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      {onLocationSearch && (
        <Button
          onClick={onLocationSearch}
          disabled={locationLoading || permissionState === "unsupported"}
          variant={getButtonVariant()}
          className={`flex items-center gap-2 ${permissionState === "denied" ? "line-through" : ""}`}
          title={getButtonTitle()}
        >
          {locationLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
          Autour de moi
        </Button>
      )}
    </div>
  );
};
