import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Heart, Phone, ArrowRight, Loader2 } from "lucide-react";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone.trim()) return setError("Please enter your phone number");
    setLoading(true);
    setError("");
    try {
      await login(phone.trim());
      navigate("/");
    } catch (err) {
      setError(
        err.message === "offline"
          ? "No internet connection. Please try again."
          : err.message || "Patient not found. Please register first."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-blue-700 text-white shadow-lg shadow-primary/30 mb-4">
            <Heart size={40} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            HealthConnect
          </h1>
          <p className="text-slate-500 mt-1">Rural Telemedicine Platform</p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/50 border border-white/60 p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-1">
            Welcome Back
          </h2>
          <p className="text-slate-500 mb-6">
            Login with your registered phone number
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <Phone
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                id="login-phone"
                type="tel"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors bg-slate-50/50"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-blue-700 text-white p-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-60 transition-all"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={22} />
              ) : (
                <>
                  Login <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-slate-500">New patient? </span>
            <Link
              to="/register"
              className="text-primary font-bold hover:underline"
            >
              Register Here
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          Nabha Civil Hospital — Telemedicine Initiative
        </p>
      </div>
    </div>
  );
};

export default Login;
