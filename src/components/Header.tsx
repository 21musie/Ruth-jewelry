import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";

/**
 * Navigation link type
 */
interface NavLink {
  label: string;
  sectionId: string;
}

const Header: React.FC = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks: NavLink[] = [
    { label: "Home", sectionId: "home" },
    { label: "About", sectionId: "about" },
    { label: "Contact", sectionId: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const shouldUseDark =
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((previous) => !previous);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSectionNavigation = (sectionId: string) => {
    closeMenu();

    if (location.pathname === "/") {
      scrollToSection(sectionId);
      return;
    }

    navigate("/", { state: { scrollTo: sectionId } });
  };

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (location.pathname === "/" && state?.scrollTo) {
      requestAnimationFrame(() => {
        scrollToSection(state.scrollTo as string);
      });
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "pt-3 px-3 md:px-6" : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <nav
          className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
            isScrolled
              ? "h-16 rounded-2xl backdrop-blur border border-border/70 shadow-[var(--shadow-soft)]"
              : "h-20"
          }`}
        >
          <Link
            to="/"
            className="font-serif text-2xl tracking-[0.2em] text-foreground hover:text-accent transition-colors"
            aria-label="Go to home page"
          >
            RUTH
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, sectionId }) => (
              <button
                type="button"
                key={label}
                onClick={() => handleSectionNavigation(sectionId)}
                className={`${
                  label === "Contact"
                    ? "btn-outline-gold !px-5 !py-2 !rounded-full dark:!text-white"
                    : "text-sm text-muted-foreground hover:text-foreground"
                } transition-colors duration-300 tracking-wide`}
              >
                {label}
              </button>
            ))}
            <Link
              to="/collections"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide"
            >
              Collection
            </Link>

            <motion.button
              whileTap={{ scale: 0.9, rotate: 15 }}
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-card border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
            </motion.button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <motion.button
              whileTap={{ scale: 0.9, rotate: 15 }}
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-card border border-border text-muted-foreground hover:text-accent transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
            </motion.button>
            <button
              onClick={toggleMenu}
              className="text-2xl text-foreground p-2"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map(({ label, sectionId }, index) => (
              <motion.button
                type="button"
                key={label}
                onClick={() => handleSectionNavigation(sectionId)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-2xl font-light text-foreground hover:text-accent transition-colors"
              >
                {label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
            >
              <Link
                to="/collections"
                onClick={closeMenu}
                className="text-2xl font-light text-foreground hover:text-accent transition-colors"
              >
                Collection
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

Header.displayName = "Header";

export default Header;
