/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn, signUp, useSession } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";


export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");

  useEffect(() => {
    if (session?.user) {
      router.replace("/");
    }
  }, [router, session]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    try {
      const result = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.photo || undefined,
      });

      if (result.error) {
        throw new Error(result.error.message || "Registration failed");
      }

      toast.success("Account created! Welcome to ShobujBangla 🌿");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const perks = [
    "Add & manage your own nature spots",
    "Save favourite destinations",
    "Write reviews & share experiences",
    "Get personalised travel recommendations",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 pt-20 pb-12 px-4">
      <div className="w-full max-w-5xl flex rounded-2xl overflow-hidden bg-card shadow-2xl border border-border">

        {/* Left Side – Branding */}
        <div className="hidden lg:flex lg:w-5/12 relative bg-primary items-center justify-center p-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80"
              alt="Nature Bangladesh"
              className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            />
          </div>
          <div className="relative z-10 text-white space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-4xl">🌿</span>
              <span className="text-3xl font-bold">ShobujBangla</span>
            </Link>
            <div>
              <h2 className="text-4xl font-extrabold leading-tight mb-4">
                Join our community of <br /> nature explorers.
              </h2>
              <p className="text-white/80 text-lg font-light">
                Discover hidden gems, share amazing places, and connect with fellow adventurers across Bangladesh.
              </p>
            </div>
            <ul className="space-y-3">
              {perks.map((perk, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90 text-sm font-medium">
                  <FiCheckCircle className="text-green-300 shrink-0" size={18} />
                  {perk}
                </li>
              ))}
            </ul>
            <p className="text-white/60 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-white font-semibold hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side – Form */}
        <div className="w-full lg:w-7/12 p-8 sm:p-10 xl:p-14 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Create an Account</h1>
              <p className="text-foreground/60">Start your nature journey with us today — it's free.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-1.5 block">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center text-foreground/40"><FiUser size={16} /></div>
                  <input
                    type="text"
                    placeholder="Rahim Uddin"
                    className={`block w-full pl-10 pr-3 py-3 border ${errors.name ? "border-red-500" : "border-border"} rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
                    {...register("name", { required: "Full name is required", minLength: { value: 3, message: "Name must be at least 3 characters" } })}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-1.5 block">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center text-foreground/40"><FiMail size={16} /></div>
                  <input
                    type="email"
                    placeholder="rahim@example.com"
                    className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? "border-red-500" : "border-border"} rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" }
                    })}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
              </div>

              {/* Photo URL */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-1.5 block">Profile Photo URL <span className="text-foreground/40 font-normal">(optional)</span></label>
                <input
                  type="url"
                  placeholder="https://example.com/your-photo.jpg"
                  className="block w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  {...register("photo")}
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-1.5 block">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center text-foreground/40"><FiLock size={16} /></div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimum 8 characters"
                    className={`block w-full pl-10 pr-10 py-3 border ${errors.password ? "border-red-500" : "border-border"} rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 8, message: "Password must be at least 8 characters" },
                      pattern: { value: /^(?=.*[A-Z])(?=.*[0-9])/, message: "Must include an uppercase letter and a number" }
                    })}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center text-foreground/40 hover:text-foreground transition-colors">
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message as string}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm font-semibold text-foreground mb-1.5 block">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center text-foreground/40"><FiLock size={16} /></div>
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter your password"
                    className={`block w-full pl-10 pr-10 py-3 border ${errors.confirmPassword ? "border-red-500" : "border-border"} rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: value => value === password || "Passwords do not match"
                    })}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute inset-y-0 right-3 flex items-center text-foreground/40 hover:text-foreground transition-colors">
                    {showConfirm ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message as string}</p>}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 pt-1">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 mt-0.5 rounded border-border accent-primary cursor-pointer"
                  {...register("terms", { required: "You must accept the terms to continue" })}
                />
                <label htmlFor="terms" className="text-sm text-foreground/70 cursor-pointer">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline font-semibold">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-primary hover:underline font-semibold">Privacy Policy</Link>
                </label>
              </div>
              {errors.terms && <p className="text-red-500 text-xs -mt-2">{errors.terms.message as string}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 gap-2 mt-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Create Account <FiArrowRight /></>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  signIn.social({ provider: "google", callbackURL: "/" });
                }}
                className="w-full py-3.5 px-4 flex items-center justify-center gap-2 border border-border rounded-xl shadow-sm text-sm font-bold text-foreground bg-card hover:bg-muted focus:outline-none transition-all"
              >
               <FcGoogle className="text-xl" /> Continue with Google
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-foreground/60">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Sign in instead
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
