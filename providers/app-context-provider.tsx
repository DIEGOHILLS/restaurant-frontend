"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ApiService } from "@/services/api/apiService";
import { useAuth } from "react-oidc-context";
import { AxiosApiService } from "@/services/api/axiosApiService";

interface AppContextType {
  apiService: ApiService | null;
  isInitialized: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function resolveApiBaseUrl() {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!configuredBaseUrl) {
    return "/api";
  }

  if (configuredBaseUrl === "/api") {
    return configuredBaseUrl;
  }

  if (
    configuredBaseUrl.startsWith("http://") ||
    configuredBaseUrl.startsWith("https://")
  ) {
    const cleaned = configuredBaseUrl.replace(/\/+$/, "");
    return cleaned.endsWith("/api") ? cleaned : `${cleaned}/api`;
  }

  const cleaned = configuredBaseUrl.replace(/^\/+|\/+$/g, "");
  return `/${cleaned}`;
}

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [apiService, setApiService] = useState<ApiService | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    try {
      const baseUrl = resolveApiBaseUrl();
      const axiosApiService = new AxiosApiService(baseUrl, auth);

      setApiService(axiosApiService);
      setIsInitialized(true);
    } catch (error) {
      console.error("Failed to initialize services:", error);
      setApiService(null);
      setIsInitialized(false);
    }
  }, [auth]);

  return (
    <AppContext.Provider value={{ apiService, isInitialized }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  return context;
};