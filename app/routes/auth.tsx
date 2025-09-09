import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "~/app.css";

export const meta = () => [
  { title: "ResumeIQ | Auth" },
  { name: "description", content: "Log into your account" },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine next page after login (default: /)
  const next = location.search.includes("next=")
    ? decodeURIComponent(location.search.split("next=")[1])
    : "/";

  // Redirect after Puter login only
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next, navigate]);

  // Full-page embedded login
  const handleLogin = () => {
    const redirectUrl = encodeURIComponent(window.location.origin + next);
    window.location.href = `https://puter.com/action/sign-in?embedded_in_popup=true&msg_id=1&redirect=${redirectUrl}`;
  };

  const handleLogout = () => {
    auth.signOut();
    navigate("/auth");
  };

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10 w-[400px] max-w-[90vw]">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-bold">Welcome</h1>
            <h2 className="text-gray-600">
              Log In to Continue Your Job Journey
            </h2>
          </div>

          {/* Centered login/logout button */}
          <div className="flex items-center justify-center w-full mt-4">
  {isLoading ? (
    <button className="auth-button animate-pulse" disabled>
      <p>Signing you in...</p>
    </button>
  ) : auth.isAuthenticated ? (
    <button className="auth-button" onClick={handleLogout}>
      <p>Log Out</p>
    </button>
  ) : (
    <button className="auth-button" onClick={handleLogin}>
      <p>Log In</p>
    </button>
  )}
</div>

        </section>
      </div>
    </main>
  );
};

export default Auth;
