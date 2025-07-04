import React, { useState } from "react";
import { User, Lock, EyeOffIcon, EyeIcon } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user_name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user_name || !password) {
      setError("All fields are required");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post("https://devservice.teemify.ai/v1/login", {
        user_name,
        password,
      });
      console.log(res);
      if (res.status >= 200 || res.status < 300) {
        setError("");
        setName("");
        setPassword("");
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      }
    } catch (err) {
      console.error("Login Failed:", err);
      setError("Invalid Credential");
    } 
  };

  return (
    <div className="h-screen flex items-center justify-center md:px-4">
      <div className="max-w-4xl w-full flex rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex-1 md:flex hidden p-12  flex-col justify-center bg-gradient-to-br from-teal-600 to-teal-800 text-white">
          <div className="max-w-md space-y-6">
            <div>
              <h1 className="text-4xl font-extrabold">
                Welcome Back to
                <span className="block text-teal-200 text-5xl mt-1">
                  Teemify
                </span>
              </h1>
            </div>
            <p className="text-lg text-teal-50 leading-relaxed">
              Log in to easily manage your products, process orders, and view
              helpful analytics — all in one place.
            </p>
            <div className="h-[2px] w-16 bg-white/30 rounded"></div>
            <p className="text-sm text-teal-200/90">
              Need help? Contact support anytime.
            </p>
          </div>
        </div>

        <div className="flex-1 p-6 sm:p-8 md:p-12 bg-white">
          <div className="max-w-md w-full mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Login</h2>
              <p className="text-gray-600 text-sm">
                Enter your credentials to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  User Name
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={user_name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-teal-500  placeholder-gray-500 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-4 flex items-center">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>

                  <div
                    className="absolute top-3 right-0 pr-4 flex items-center cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-50 pl-12 pr-12 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-500 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-red-600 font-medium">
                  {error && error}
                </span>
                <span className="text-teal-600 hover:text-teal-700 cursor-pointer font-medium">
                  Forgot password?
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3 rounded-xl text-sm disabled:opacity-50"
              >
                {isLoading ? "Submitting..." : "Login"}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                Don't have an account?
                <span className="text-teal-600 hover:text-teal-700 font-semibold cursor-pointer ml-1">
                  Create account
                </span>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                By signing in, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
