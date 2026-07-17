import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, X } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full text-left px-4 md:px-0 border-t border-[0.5px] border-border">
      <div className="w-[95%] mx-auto py-16 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
        {/* Brand — full width on mobile, first col on md */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <Image
              src="/icons/postmorph-logo-variant.png"
              width={28}
              height={28}
              alt="Postmorph Logo"
            />
            <span className="font-bold text-sm">Postmorph</span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Turn one piece of content into dozens. Repurpose your videos, blogs,
            and posts for every channel.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/postmorph_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </a>
            <a
              href="mailto:info@postmorph.com"
              aria-label="Email"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Product */}
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold">Product</p>
          <ul className="flex flex-col gap-2.5">
            {[
              { href: "#features", label: "Features" },
              { href: "#pricing", label: "Pricing" },
              { href: "#how-it-works", label: "How it works" },
              { href: "#faq", label: "FAQ" },
            ].map(({ href, label }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold">Company</p>
          <ul className="flex flex-col gap-2.5">
            <li>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold">Legal</p>
          <ul className="flex flex-col gap-2.5">
            <li>
              <Link
                href="/legal/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/legal/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </li>
            <li className="flex items-center gap-1.5 pt-1">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="text-sm text-muted-foreground">
                Nigeria, Africa
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[0.5px] border-border">
        <div className="w-[95%] mx-auto py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Postmorph. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for creators who ship.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
