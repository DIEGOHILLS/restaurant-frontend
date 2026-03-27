"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "react-oidc-context";

type KeycloakTokenPayload = {
  realm_access?: {
    roles?: string[];
  };
};

function parseJwt(token?: string): KeycloakTokenPayload | null {
  if (!token) {
    return null;
  }

  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) {
      return null;
    }

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join(""),
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to parse JWT:", error);
    return null;
  }
}

export default function AuthButton() {
  const { signinRedirect, signoutRedirect, isAuthenticated, user } = useAuth();

  const handleLogin = async () => {
    try {
      await signinRedirect();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signoutRedirect();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const tokenPayload = parseJwt(user?.access_token);
  const roles = tokenPayload?.realm_access?.roles ?? [];
  const isAdmin = roles.some((role) => role.toLowerCase() === "admin");

  console.log("AUTH DEBUG", {
    isAuthenticated,
    roles,
    isAdmin,
    username: user?.profile?.preferred_username,
  });

  if (isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt="User avatar"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled>
            {isAdmin ? "Admin user" : "Normal user"}
          </DropdownMenuItem>

          {isAdmin && (
            <DropdownMenuItem asChild>
              <Link href="/restaurants/create">Add Restaurant</Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return <Button onClick={handleLogin}>Login</Button>;
}