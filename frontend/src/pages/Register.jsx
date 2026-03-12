import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Heart, User, Phone, Droplets, AlertCircle, ArrowRight, Loader2 } from "lucide-react";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    blood_group: "",
    allergies: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim())
      return setError("Name and Phone are required");
    setLoading(true);
    setError("");
    try {
      await register({ ...form, allergies: form.allergies || "None" });
      navigate("/");
    } catch (err) {
      setError(
        err.message === "offline"
          ? "No internet connection. Please try again."
          : err.message || "Registration failed. Phone may already be registered."
      );
    } finally {
      setLoading(false);
    }
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-emerald-700 text-white shadow-lg shadow-secondary/30 mb-3">
            <Heart size={32} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Create Account
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Register to access telemedicine services
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-200/50 border border-white/60 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                id="register-name"
                name="name"
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 text-lg border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors bg-slate-50/50"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                id="register-phone"
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 text-lg border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors bg-slate-50/50"
              />
            </div>

            {/* Blood Group */}
            <div className="relative">
              <Droplets
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <select
                name="blood_group"
                value={form.blood_group}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 text-lg border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors bg-slate-50/50 appearance-none"
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            {/* Allergies */}
            <div className="relative">
              <AlertCircle
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                name="allergies"
                type="text"
                placeholder="Known Allergies (optional)"
                value={form.allergies}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 text-lg border-2 border-slate-200 rounded-xl focus:border-primary focus:outline-none transition-colors bg-slate-50/50"
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
              className="w-full bg-gradient-to-r from-secondary to-emerald-700 text-white p-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-secondary/30 disabled:opacity-60 transition-all mt-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={22} />
              ) : (
                <>
                  Register <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 text-center">
            <span className="text-slate-500">Already registered? </span>
            <Link
              to="/login"
              className="text-primary font-bold hover:underline"
            >
              Login Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
