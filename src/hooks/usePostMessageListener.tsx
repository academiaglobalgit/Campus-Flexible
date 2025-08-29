import { useEffect } from "react";

type MessageHandler<T = any> = (data: T, event: MessageEvent) => void;

export const usePostMessageListener = <T = any>(
  allowedOrigins: string[],
  onMessage: MessageHandler<T>) => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Si está permitido "*" se aceptan todos los orígenes
      const allowAll = allowedOrigins.includes("*");

      if (!allowAll && !allowedOrigins.includes(event.origin)) {
        console.warn("Mensaje bloqueado, origen no confiable:", event.origin);
        return;
      }

      try {
        onMessage(event.data as T, event);
      } catch (error) {
        console.error("Error procesando mensaje:", error);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [allowedOrigins, onMessage]);
};
