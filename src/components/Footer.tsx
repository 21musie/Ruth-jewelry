/**
 * @file Footer.tsx
 * @description Global footer with brand details, navigation links, services, and contact info.
 * @module Components/Layout
 */

import React, { memo } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
} from "lucide-react";
import { FaTiktok, FaTelegramPlane } from "react-icons/fa";

/**
 * Navigation link type definition
 */
interface NavLink {
  label: string;
  href: string;
}

/**
 * Service type definition
 */
interface Service {
  label: string;
}

/**
 * Social link type definition
 */
interface SocialLink {
  label: string;
  href: string;
  icon: React.ElementType;
}

const Footer: React.FC = memo(() => {
  const currentYear: number = new Date().getFullYear();

  const quickLinks: NavLink[] = [
    { label: "About Us", href: "/#about" },
    { label: "Collection", href: "/collections" },
    { label: "Services", href: "/#footer-services-heading" },
    { label: "Contact", href: "/#contact" },
  ];

  const services: Service[] = [
    { label: "Custom Order Jewelry" },
    { label: "Ring Resizing & Repairs" },
    { label: "Necklace & Pendant" },
    { label: "Polishing & Cleaning Service" },
    { label: "Gift Packaging & Delivery" },
  ];

  const socialLinks: SocialLink[] = [
    { label: "Instagram", href: "#", icon: Instagram },
    { label: "TikTok", href: "#", icon: FaTiktok },
    { label: "Telegram", href: "#", icon: FaTelegramPlane },
  ];

  return (
    <footer
      id="contact"
      className="bg-primary text-primary-foreground py-16"
      aria-labelledby="footer-heading"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3
              id="footer-heading"
              className="font-serif text-2xl font-bold mb-6"
            >
              RUTH Jewelry
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed mb-6">
            እርስዎ ብቻ ይዘዙ፤ እኛ ባሉበት ቦታ በተመጣጣኝ ዋጋ እናደርሳለን።
            </p>
            <nav aria-label="Social Media">
              <ul className="flex space-x-4">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors duration-200"
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick Links">
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <section aria-labelledby="footer-services-heading">
            <h4
              id="footer-services-heading"
              className="font-semibold text-lg mb-6"
            >
              Services
            </h4>
            <ul className="space-y-3 text-primary-foreground/80">
              {services.map(({ label }) => (
                <li key={label}>
                  <span className="text-primary-foreground/80">{label}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Contact Info */}
          <address
            className="not-italic"
            aria-labelledby="footer-contact-heading"
          >
            <h4
              id="footer-contact-heading"
              className="font-semibold text-lg mb-6"
            >
              Contact Information
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin
                  className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="text-primary-foreground/80">
                  <p>Everwhere with delivery</p>
                  <p></p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Phone
                  className="w-5 h-5 text-accent flex-shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="tel:+251 909 09 09 09"
                  className="text-primary-foreground/80"
                >
                  +251 909 09 09 09
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail
                  className="w-5 h-5 text-accent flex-shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="mailto:mmengesha27@gmail.com"
                  className="text-primary-foreground/80"
                >
                  ruthjewelry@gmail.com
                </a>
              </li>
            </ul>
          </address>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/60 text-sm">
              © {currentYear} RuthJewelry. All rights reserved.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
