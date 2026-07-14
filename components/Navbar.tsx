"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { signOut, useSession } from "@/lib/auth-client";
import { FiMenu, FiX, FiSun, FiMoon, FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Swal from "sweetalert2";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const publicNavLinks = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" }
];

const authenticatedNavLinks = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Add Place", href: "/add-place" },
  { name: "Manage Places", href: "/manage-places" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { mounted, resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const isAuthenticated = Boolean(user);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const frame = window.requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(isDark ? "light" : "dark");
  };

  const handleSignOut = async () => {
    setIsOpen(false);

    const result = await Swal.fire({
      title: "Sign out?",
      text: "You will be logged out of your account.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, sign out",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2e7d32",
    });

    if (!result.isConfirmed) return;

    try {
      await signOut();
      await Swal.fire({
        icon: "success",
        title: "Signed out",
        text: "You have been signed out successfully.",
        timer: 1800,
        showConfirmButton: false,
      });
      router.push("/login");
    } catch (error: any) {
      Swal.fire({ icon: "error", title: "Sign out failed", text: error?.message || "Failed to sign out" });
    }
  };

  // When transparent (hero behind), always white text.
  // When scrolled or NOT on home page (solid bg), use theme colors.
  const isSolid = scrolled || pathname !== "/";
  const visibleLinks = isAuthenticated ? authenticatedNavLinks : publicNavLinks;

  const linkClass = isSolid ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white";
  const activeLinkClass = isSolid ? "text-primary font-semibold" : "text-white font-bold";
  const iconBtnClass = isSolid
    ? "p-2 rounded-full hover:bg-muted text-foreground/70 hover:text-primary transition-colors"
    : "p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isSolid
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm py-3"
          : "bg-gradient-to-b from-black/55 to-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.span 
              initial={{ rotate: -20, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
              className="text-3xl"
            >🌿</motion.span>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={cn(
                "text-xl font-extrabold tracking-tight transition-all duration-300",
                isSolid
                  ? "text-primary drop-shadow-sm"
                  : "text-white"
              )}
            >
              ShobujBangla
            </motion.span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {visibleLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm font-medium transition-colors",
                        pathname === link.href ? activeLinkClass : linkClass
                      )}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
            </ul>

            <div
              className={cn(
                "flex items-center gap-4 pl-4 border-l transition-colors",
                isSolid ? "border-border" : "border-white/30"
              )}
            >
              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className={iconBtnClass}
                  aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
                </button>
              )}

              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-2 py-1.5">
                    <Image
                      src={user?.image || "https://i.pravatar.cc/80?img=12"}
                      alt={user?.name || "User avatar"}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className={cn("text-sm font-medium", isSolid ? "text-foreground" : "text-white")}>{user?.name || "User"}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className={cn(
                      "rounded-full p-2 transition-colors",
                      isSolid ? "text-foreground/70 hover:text-primary hover:bg-muted" : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                    aria-label="Sign out"
                  >
                    <FiLogOut size={18} />
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/login" className={cn("text-sm font-medium transition-colors", linkClass)}>
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-semibold transition-all",
                      isSolid
                        ? "bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg"
                        : "bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/40 text-white"
                    )}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            {mounted && (
              <button
                onClick={toggleTheme}
                className={iconBtnClass}
                aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-2 rounded-full transition-colors",
                isSolid
                  ? "text-foreground/80 hover:text-primary hover:bg-muted"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              )}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu — always has solid background regardless of scroll */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-lg md:hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <ul className="flex flex-col gap-1">
                {visibleLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block px-4 py-3 rounded-lg transition-colors text-base font-medium",
                          pathname === link.href
                            ? "bg-primary/10 text-primary"
                            : "text-foreground/80 hover:bg-muted hover:text-primary"
                        )}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
              </ul>
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                {isAuthenticated ? (
                  <>
                    <div className="col-span-2 flex items-center justify-between rounded-xl border border-border bg-muted/50 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={user?.image || "https://i.pravatar.cc/80?img=12"}
                          alt={user?.name || "User avatar"}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold text-foreground">{user?.name || "User"}</p>
                          <p className="text-xs text-foreground/60">{user?.email}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="rounded-full p-2 text-foreground/70 hover:text-primary"
                      >
                        <FiLogOut size={18} />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center py-3 rounded-xl border border-border font-semibold text-foreground hover:bg-muted transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-md"
                    >
                      Sign Up
                      
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
