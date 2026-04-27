import React, { memo } from "react";

const heroRing = "/images/ring1.avif";
const pearlNecklace = "/images/jew10.avif";
const emeraldBracelet = "/images/jew.jpg";
const sapphireEarrings = "/images/earing.webp";
const rubyPendant = "/images/jew9.webp";

const galleryItems = [
  { title: "Diamond Ring", image: heroRing, span: "md:col-span-2 lg:col-span-5" },
  { title: "Pearl Necklace", image: pearlNecklace, span: "lg:col-span-3" },
  { title: "Emerald Bracelet", image: emeraldBracelet, span: "lg:col-span-4" },
  { title: "Sapphire Earrings", image: sapphireEarrings, span: "lg:col-span-4" },
  { title: "Ruby Pendant", image: rubyPendant, span: "md:col-span-2 lg:col-span-8" },
];

const PictureGallery: React.FC = () => {
  return (
    <section className="py-20 bg-silk/60">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-accent tracking-[0.2em] text-xs uppercase mb-3">Gallery</p>
          <h2 className="font-serif text-4xl md:text-5xl text-primary">Featured Pictures</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {galleryItems.map((item) => (
            <article
              key={item.title}
              className={`group overflow-hidden rounded-2xl border border-border/60 bg-card/70 ${item.span}`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="px-5 py-4">
                <h3 className="font-serif text-lg text-primary">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(PictureGallery);
