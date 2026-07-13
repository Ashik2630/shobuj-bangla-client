import Link from "next/link";
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMapPin, FiPhone, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Description */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold">
                Shobuj<span className="text-primary">Bangla</span>
              </span>
            </Link>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Discover the breathtaking rivers, hills, forests, and hidden gems of Bangladesh. Your ultimate eco-tourism travel guide.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <FiYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span> Home
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span> Explore Destinations
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span> Travel Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span> About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Destinations */}
          <div>
            <h3 className="text-lg font-bold mb-6">Top Destinations</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/explore?search=Sundarbans" className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span> The Sundarbans
                </Link>
              </li>
              <li>
                <Link href="/explore?search=Sajek" className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span> Sajek Valley
                </Link>
              </li>
              <li>
                <Link href="/explore?search=Coxs+Bazar" className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span> Cox's Bazar
                </Link>
              </li>
              <li>
                <Link href="/explore?search=Bandarban" className="text-foreground/70 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span> Bandarban Hills
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-primary mt-1 shrink-0" size={18} />
                <span className="text-foreground/70 leading-relaxed">
                  123 Nature Avenue, <br />
                  Dhaka 1212, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-primary shrink-0" size={18} />
                <span className="text-foreground/70">+880 1234 567890</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-primary shrink-0" size={18} />
                <a href="mailto:hello@shobujbangla.com" className="text-foreground/70 hover:text-primary transition-colors">
                  hello@shobujbangla.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/50">
          <p>© {new Date().getFullYear()} ShobujBangla. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
