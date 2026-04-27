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
  sectionId?: string;
  to?: string;
}

const Header: React.FC = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks: NavLink[] = [
    { label: "Home", sectionId: "home" },
    { label: "About", sectionId: "about" },
    { label: "Collection", to: "/collections" },
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

  useEffect(() => {
    if (location.pathname === "/collections") {
      setActiveNav("Collection");
      return;
    }

    const sectionMap = [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "contact", label: "Contact" },
    ];

    const updateActiveSection = () => {
      let currentLabel = "Home";
      const threshold = 140;

      for (const section of sectionMap) {
        const element = document.getElementById(section.id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= threshold) {
          currentLabel = section.label;
        }
      }

      setActiveNav(currentLabel);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [location.pathname]);

  const desktopNavClass = (isActive: boolean) =>
    `relative text-sm tracking-wide pb-2 transition-all duration-300 ${
      isActive
        ? "text-accent"
        : "text-muted-foreground hover:text-foreground"
    } after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-gradient-to-r after:from-accent after:to-gold after:transition-all after:duration-300 ${
      isActive ? "after:w-full after:shadow-[var(--shadow-gold)]" : "after:w-0 hover:after:w-full"
    }`;

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
            {navLinks.map(({ label, sectionId, to }) =>
              to ? (
                <Link
                  key={label}
                  to={to}
                  onClick={() => setActiveNav(label)}
                  className={desktopNavClass(activeNav === label)}
                >
                  {label}
                </Link>
              ) : (
                <button
                  type="button"
                  key={label}
                  onClick={() => {
                    setActiveNav(label);
                    handleSectionNavigation(sectionId as string);
                  }}
                  className={desktopNavClass(activeNav === label)}
                >
                  {label}
                </button>
              )
            )}

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
            {navLinks.map(({ label, sectionId, to }, index) =>
              to ? (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={to}
                    onClick={() => {
                      setActiveNav(label);
                      closeMenu();
                    }}
                    className={`text-2xl font-light transition-colors ${
                      activeNav === label
                        ? "text-accent"
                        : "text-foreground hover:text-accent"
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ) : (
                <motion.button
                  type="button"
                  key={label}
                  onClick={() => {
                    setActiveNav(label);
                    handleSectionNavigation(sectionId as string);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-2xl font-light transition-colors ${
                    activeNav === label
                      ? "text-accent"
                      : "text-foreground hover:text-accent"
                  }`}
                >
                  {label}
                </motion.button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

Header.displayName = "Header";

export default Header;
