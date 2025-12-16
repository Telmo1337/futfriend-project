import { useMemo } from "react";
import useAuth from "./hooks/useAuth";

export default function AuthProviderBridge({ children }) {
  const { user, isAuthenticated, logout } = useAuth();

  const session = useMemo(() => {
    if (!isAuthenticated || !user) return null;

    return {
      user: {
        name: user.nickname || `${user.firstName} ${user.lastName}`,
        email: user.email,
      },
    };
  }, [isAuthenticated, user]);

  const authentication = useMemo(
    () => ({
      signOut: () => {
        logout();
        window.location.href = "/login";
      },
    }),
    [logout]
  );

  return children({ session, authentication });
}
