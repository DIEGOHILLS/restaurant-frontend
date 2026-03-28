"use client";

import { AuthProvider } from "react-oidc-context";
import { PropsWithChildren } from "react";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const keycloakUrl =
  process.env.NEXT_PUBLIC_KEYCLOAK_URL ||
  "https://keycloak-production-fd8d.up.railway.app";

const keycloakRealm =
  process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "restaurant-review";

const keycloakClientId =
  process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "frontend-client";

export const oidcConfig = {
  authority: `${keycloakUrl.replace(/\/+$/, "")}/realms/${keycloakRealm}`,

  client_id: keycloakClientId,

  redirect_uri: baseUrl,
  post_logout_redirect_uri: baseUrl,

  response_type: "code",
  scope: "openid profile email",

  automaticSilentRenew: true,
  loadUserInfo: true,

  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

export function AppAuthProvider({ children }: PropsWithChildren) {
  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
}
