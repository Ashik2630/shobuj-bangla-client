"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (session?.user) {
      router.replace("/");
    }
  }, [router, session]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    try {
      const result = await signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: true,
      });

      if (result.error) {
        throw new Error(result.error.message || "Login failed");
      }

      await Swal.fire({
        icon: "success",
        title: "Welcome back",
        text: "Successfully logged in!",
        timer: 1600,
        showConfirmButton: false,
      });
      router.push("/");
    } catch (error: any) {
      Swal.fire({ icon: "error", title: "Login failed", text: error.message || "Login failed" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signIn.email({
        email: "demo@shobujbangla.test",
        password: "DemoPass123!",
        rememberMe: true,
      });

      if (result.error) throw new Error(result.error.message || "Demo login failed");

      await Swal.fire({
        icon: "success",
        title: "Demo login successful",
        text: "Signed in as demo user",
        timer: 1600,
        showConfirmButton: false,
      });
      router.push("/");
    } catch (error: any) {
      Swal.fire({ icon: "error", title: "Demo login failed", text: error?.message || "Demo login failed" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl flex rounded-2xl overflow-hidden bg-card shadow-2xl border border-border">
        
        {/* Left Side - Image/Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-primary items-center justify-center p-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1590880449155-b54f958ce314?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Nature" 
              className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
          </div>
          
          <div className="relative z-10 text-white space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 group mb-8">
              <span className="text-4xl">🌿</span>
              <span className="text-3xl font-bold tracking-tight">ShobujBangla</span>
            </Link>
            
            <h2 className="text-4xl font-extrabold leading-tight">
              Welcome back to your <br/> nature journey.
            </h2>
            
            <p className="text-lg text-white/80 max-w-md font-light">
              Discover, explore, and share the breathtaking natural beauty of Bangladesh with a community of nature lovers.
            </p>
            
            <div className="pt-8">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i} 
                    className="w-12 h-12 rounded-full border-2 border-primary object-cover" 
                    src={`https://i.pravatar.cc/100?img=${i}`} 
                    alt={`User ${i}`} 
                  />
                ))}
                <div className="w-12 h-12 rounded-full border-2 border-primary bg-white/20 backdrop-blur-sm flex items-center justify-center text-sm font-medium">
                  +2k
                </div>
              </div>
              <p className="text-sm text-white/70 mt-3 font-medium">Join 2,000+ explorers</p>
            </div>
          </div>
        </div>
        
        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 xl:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Sign In</h1>
              <p className="text-foreground/60">Please enter your details to sign in.</p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-foreground/40">
                    <FiMail />
                  </div>
                  <input
                    type="email"
                    className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-500' : 'border-border'} rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
                    placeholder="name@example.com"
                    {...register("email", { required: "Email is required" })}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-foreground/40">
                    <FiLock />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`block w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-500' : 'border-border'} rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all`}
                    placeholder="••••••••"
                    {...register("password", { required: "Password is required" })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-foreground/40 hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message as string}</p>}
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground/70 cursor-pointer">
                  Remember me for 30 days
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Sign In <FiArrowRight /></>
                )}
              </button>
              
              <div className="pt-4 flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => {
                    signIn.social({ provider: "google", callbackURL: "/" });
                  }}
                  className="w-full py-3.5 px-4 flex items-center justify-center gap-2 border border-border rounded-xl shadow-sm text-sm font-bold text-foreground bg-card hover:bg-muted focus:outline-none transition-all"
                >
                 <FcGoogle className="text-xl" /> Continue with Google 
                </button>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 flex items-center justify-center gap-2 border border-border rounded-xl shadow-sm text-sm font-bold text-foreground bg-background hover:bg-muted focus:outline-none transition-all"
                >
                  Demo Login
                </button>
              </div>
            </form>
            
            <p className="mt-8 text-center text-sm text-foreground/60">
              Don't have an account?{" "}
              <Link href="/register" className="font-semibold text-primary hover:underline">
                Sign up for free
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
