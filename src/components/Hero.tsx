import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const heroRing = "/images/ring1.avif";
const pearlNecklace = "/images/neck.avif";
const emeraldBracelet = "/images/jew10.avif";
const sapphireEarrings = "/images/earing.webp";
const rubyPendant = "/images/jew5.avif";

const Hero: React.FC = memo(() => {
  const titleRef = useScrollAnimation();
  const productRef = useScrollAnimation();
  const categoriesRef = useScrollAnimation();

  const categories = [
    { name: "BRACELETS", image: emeraldBracelet },
    { name: "EARRINGS", image: sapphireEarrings },
    { name: "PENDANTS", image: rubyPendant },
    { name: "RINGS", image: heroRing },
  ];
  const slidingCategories = [...categories, ...categories];

  const featuredProducts = [
    {
      name: "Diamond Earrings",
      subtitle: "18K Gold",
      image: sapphireEarrings,
      aspect: "aspect-square",
    },
    {
      name: "Pearl Necklace",
      subtitle: "Premium Pearls",
      image: pearlNecklace,
      aspect: "aspect-[3/4]",
    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-to-b from-background to-silk overflow-hidden scroll-mt-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[70vh]">
          {/* Left: Title & CTA */}
          <div
            ref={titleRef}
            className="scroll-animate text-center lg:text-left space-y-6 sm:space-y-8"
          >
            <header>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-4 sm:mb-6 leading-tight">
                RUTH
                <span className="block text-accent">JEWELRY COLLECTION</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 font-light tracking-wide">
                DISCOVER OUR SPARKLE LUXE COLLECTION
              </p>
            </header>
            <div className="space-y-3 sm:space-y-4">
              <Link
                to="#collection"
                className="inline-flex items-center justify-center bg-gradient-to-r from-gold via-gold-light to-gold-dark text-primary-foreground px-8 sm:px-10 py-3.5 rounded-full text-base sm:text-lg font-semibold tracking-wide border border-white/20 backdrop-blur-sm shadow-[0_10px_30px_-12px_hsl(var(--gold)/0.65)] hover:shadow-[0_18px_40px_-14px_hsl(var(--gold)/0.8)] hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-[0.99] transition-all duration-300 w-full sm:w-auto"
              >
                SHOP NOW COLLECTION
              </Link>
              <p className="text-xs sm:text-sm text-muted-foreground">
                For yourself and for your loved ones...
              </p>
            </div>
          </div>

          {/* Right: Featured Products */}
          <div ref={productRef} className="scroll-animate stagger-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {featuredProducts.map((product, idx) => (
                <div
                  key={product.name}
                  className={idx === 1 ? "sm:mt-8 lg:mt-12" : ""}
                >
                  <div className="luxury-card p-4 sm:p-6 group cursor-pointer elegant-transition hover:scale-105">
                    <div
                      className={`${product.aspect} overflow-hidden rounded-lg mb-3 sm:mb-4`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 elegant-transition"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="font-serif text-base sm:text-lg font-semibold text-primary mb-0.5 sm:mb-1">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {product.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div
          id="collection"
          ref={categoriesRef}
          className="scroll-animate stagger-3 mt-14 sm:mt-20 scroll-mt-28"
        >
          <div className="relative overflow-hidden py-2">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-background to-transparent" />
            <div className="animate-marquee-reverse flex w-max gap-4 sm:gap-6">
              {slidingCategories.map((cat, idx) => (
                <Link
                  key={`${cat.name}-${idx}`}
                  to="#"
                  className="group w-44 sm:w-52 md:w-56 flex-shrink-0"
                >
                  <div className="luxury-card p-3 sm:p-4 text-center hover:scale-105 elegant-transition">
                    <div className="aspect-square overflow-hidden rounded-lg mb-2 sm:mb-3">
                      <img
                        src={cat.image}
                        alt={`${cat.name} category`}
                        className="w-full h-full object-cover group-hover:scale-110 elegant-transition"
                      />
                    </div>
                    <h3 className="font-serif text-xs sm:text-sm font-semibold text-primary tracking-wider">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
