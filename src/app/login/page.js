"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react"; // Import useEffect
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("demo@gmail.com");
  const [password, setPassword] = useState("demo");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if the user is already authenticated
    // if (!loading && user) {
    //   router.push("/");
    // }

    // Load the remembered email from local storage on initial render
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true); // Automatically check the "Remember me" box
    }
  }, [user, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, password, rememberMe);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // if (loading || user) {
  //   return null;
  // }

  return (
    <div className="flex items-center justify-center min-h-[75vh]">
      <div className="w-full max-w-md p-8">
        {/* Logo and Heading */}
        <div className="mb-6">
          <img
            className="h-16 mx-auto"
            src="https://mytime2cloud.com/logo22.png"
            alt="Logo"
          />
        </div>
        <div className="text-gray-500 text-1xl text-center mb-8">
          <b>Welcome Back</b>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 text-gray-500 rounded-xl border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 text-gray-500 rounded-xl border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />

          {/* "Remember Me" and "Forgot Password" section */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-2">
              {/* <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label htmlFor="rememberMe" className="text-gray-500 select-none">
                Remember me
              </label> */}
            </div>
            <p className="text-indigo-500 underline cursor-pointer">
              Forgot password?
            </p>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 font-bold bg-[#8A2BE2] hover:bg-indigo-700 text-white rounded-xl text-lg shadow-md transition duration-300"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </div>
    </div>
  );
}