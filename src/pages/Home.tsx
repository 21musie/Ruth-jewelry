// File: Home.tsx
import React, { memo, Suspense, useEffect, useState } from "react";
import PageLoader from "@/components/PageLoader";

// Lazy load non-critical sections to improve initial load performance
const Hero = React.lazy(() => import("@/components/Hero"));
const About = React.lazy(() => import("@/components/About"));
const PictureGallery = React.lazy(() => import("@/components/PictureGallery"));

/**
 * Home
 * Renders the main homepage with all key sections.
 *
 * - Lazy loads sections to improve Time To Interactive (TTI)
 * - Uses semantic landmarks for accessibility
 * - Memoized for avoiding unnecessary re-renders
 */
const Home: React.FC = memo(() => {
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, []);

  if (isPageLoading) {
    return <PageLoader label="Loading Home" />;
  }

  return (
    <main className="min-h-screen" id="home-page">
      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        {/* Hero Section */}
        <section aria-label="Hero">
          <Hero />
        </section>

        <div className="divider-gold max-w-2xl mx-auto" aria-hidden="true" />

        {/* About Section */}
        <section aria-labelledby="about-heading">
          <About />
        </section>

        <div className="divider-gold max-w-2xl mx-auto" aria-hidden="true" />

        {/* Pictures Section */}
        <section aria-label="Pictures gallery">
          <PictureGallery />
        </section>
      </Suspense>
    </main>
  );
});

Home.displayName = "Home";

export default Home;
