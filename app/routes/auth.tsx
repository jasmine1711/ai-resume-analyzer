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

  // Default redirect after login
  const next = location.search.includes("next=")
    ? decodeURIComponent(location.search.split("next=")[1])
    : "/";
  // Redirect only when authenticated
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next, { replace: true }); // replace avoids blinking in history
    }
  }, [auth.isAuthenticated, next, navigate]);

  const handleLogin = () => {
    const redirectUrl = encodeURIComponent(window.location.origin + next);
    window.location.href = `https://puter.com/action/sign-in?embedded_in_popup=true&msg_id=1&redirect=${redirectUrl}`;
  };

  const handleLogout = () => {
    auth.signOut();
    navigate("/auth", { replace: true });
  };

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10 ">
        
          {/* Text stays left-aligned */}
          <div className="flex flex-col  items-center gap-2 text-center">
            <h1 className="text-2xl font-bold ">Welcome</h1>
            <h2 className="text-gray-600 ">
              Log In to Continue Your Job Journey
            </h2>
          </div>

          {/* Only the button is centered */}
          <div className="flex justify-center">
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
