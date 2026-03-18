import { useState, useEffect } from "react";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export type PermissionState = "granted" | "denied" | "prompt" | "unsupported";

export const useGeolocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [permissionState, setPermissionState] = useState<PermissionState>("prompt");

  // Check permission state on mount
  useEffect(() => {
    const checkPermission = async () => {
      if (!navigator.permissions || !navigator.geolocation) {
        setPermissionState("unsupported");
        return;
      }

      try {
        const result = await navigator.permissions.query({ name: "geolocation" });
        setPermissionState(result.state as PermissionState);

        // Listen for permission changes
        result.addEventListener("change", () => {
          setPermissionState(result.state as PermissionState);
        });
      } catch (err) {
        // Permissions API might not be fully supported
        console.warn("Permissions API not available:", err);
      }
    };

    checkPermission();
  }, []);

  const requestLocation = (): Promise<Coordinates> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const errorMsg = "Geolocation is not supported by your browser";
        setError(errorMsg);
        reject(new Error(errorMsg));
        return;
      }

      setLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCoordinates(coords);
          setPermissionState("granted");
          setLoading(false);
          resolve(coords);
        },
        (error) => {
          let errorMsg = "Unable to retrieve your location";

          switch (error.code) {
            case error.PERMISSION_DENIED:
              setPermissionState("denied");
              setLoading(false);
              reject(new Error("Location permission denied"));
              return; // Don't set error message, just update permission state
            case error.POSITION_UNAVAILABLE:
              errorMsg = "Location information unavailable";
              break;
          }

          setError(errorMsg);
          setLoading(false);
          reject(new Error(errorMsg));
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
        }
      );
    });
  };

  return { requestLocation, coordinates, loading, error, permissionState };
};
