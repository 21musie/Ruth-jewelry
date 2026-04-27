import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const pearlNecklace = "/images/jew3.jpeg";
const rubyPendant = "/images/jew4.jpg";

/**
 * About Section Component
 * Displays company heritage information with animated scroll effects,
 * supporting video playback and responsive imagery.
 *
 * @component
 * @returns {JSX.Element} About section markup
 */
const About: React.FC = () => {
  // Scroll animation refs
  const titleRef = useScrollAnimation();
  const contentRef = useScrollAnimation();
  const visualRef = useScrollAnimation();

  return (
    <section
      id="about"
      className="about-section py-20 bg-silk/55 border-y border-gold/55 dark:border-gold/45 scroll-mt-28"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div ref={titleRef} className="scroll-animate">
              <p className="about-section__subtitle text-accent text-sm font-medium tracking-widest uppercase mb-4">
                OUR SERVICE
              </p>
              <h2 className="about-section__title font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
                CUSTOM ORDERS
                
                <br />
                DELIVERED <span className="text-primary">WITH CARE</span>
              </h2>

              <div
                ref={contentRef}
                className="scroll-animate stagger-2 space-y-6 text-lg text-muted-foreground leading-relaxed mb-8"
              >
                <p>
                  We take orders and deliver exactly as requested, with quality
                  craftsmanship and attention to detail.
                </p>
                <p>All of this comes at a fair amount of money.</p>
              </div>
              <Link
                to="/collections"
                className="btn-gold text-base sm:text-lg font-medium w-full sm:w-auto"
              >
                SHOP NOW
              </Link>
            </div>

            {/* Image Section */}
            <div ref={visualRef} className="scroll-animate stagger-4 relative">
              <div className="relative">
                {/* Main Visual Area */}
                <div
                  className="about-section__video relative aspect-[4/5] bg-accent/10 rounded-lg overflow-hidden max-h-[600px]"
                >
                  <img
                    src={pearlNecklace}
                    alt="Pearl necklace"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Overlay Image */}
                <div className="about-section__overlay-image absolute -top-4 right-24 w-24 h-24 md:w-40 md:h-40 rounded-lg overflow-hidden shadow-xl">
                  <img
                    src={rubyPendant}
                    alt="Ruby pendant representing heritage craftsmanship"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant divider */}
      <div className="mt-20">
        <div className="divider-gold max-w-xs mx-auto" aria-hidden="true" />
      </div>
    </section>
  );
};

export default memo(About);
