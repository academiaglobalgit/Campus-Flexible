import { useEffect } from "react";
import { useNotification } from "./NotificationProvider";
import { apiClient } from "../services/ApiConfiguration/httpClient";

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const { showNotification } = useNotification();

  useEffect(() => {
    const unsubscribe = apiClient.subscribeUnauthorized(() => {
      showNotification("Tu sesión ha expirado.", "error");
    });

    return () => {
      unsubscribe();
    };
  }, [showNotification]);

  return <>{children}</>;
};
