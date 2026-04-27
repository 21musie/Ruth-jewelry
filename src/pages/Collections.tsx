import React, { useEffect, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Eye, X, ShoppingBag } from "lucide-react";
import PageLoader from "@/components/PageLoader";

const heroRing = "/images/ring1.avif";
const pearlNecklace = "/images/neck.avif";
const emeraldBracelet = "/images/jew10.avif";
const sapphireEarrings = "/images/earing.webp";
const rubyPendant = "/images/jew4.jpg";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  details: string;
  primaryImage: string;
  hoverImage: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Diamond Solitaire Ring",
    category: "Rings",
    price: 1150,
    description: "A timeless solitaire crafted in 18K gold.",
    details:
      "This stunning solitaire ring features a 1.2ct round brilliant diamond set in a classic four-prong 18K gold mounting. Hand-polished to a mirror finish, it radiates elegance for any occasion. Each stone is GIA-certified for cut, color, and clarity.",
    primaryImage: heroRing,
    hoverImage: pearlNecklace,
  },
  {
    id: 2,
    name: "Baroque Pearl Necklace",
    category: "Necklaces",
    price: 980,
    originalPrice: 1190,
    description: "Lustrous baroque pearls strung on fine silk.",
    details:
      "Sourced from pristine South Sea waters, each baroque pearl is hand-selected for its unique shape and luminous nacre. Strung on triple-knotted silk and finished with an 18K gold clasp, this necklace is a wearable treasure that improves with age.",
    primaryImage: pearlNecklace,
    hoverImage: emeraldBracelet,
  },
  {
    id: 3,
    name: "Emerald Tennis Bracelet",
    category: "Bracelets",
    price: 1100,
    originalPrice: 1180,
    description: "Colombian emeralds in a pavé gold setting.",
    details:
      "Twelve vivid Colombian emeralds are channel-set in solid 18K yellow gold, totalling 4.8ct of lush green brilliance. A double-safety clasp ensures secure wear while the flexible design conforms beautifully to the wrist. Includes gemological certificate.",
    primaryImage: emeraldBracelet,
    hoverImage: sapphireEarrings,
  },
  {
    id: 4,
    name: "Sapphire Drop Earrings",
    category: "Earrings",
    price: 1170,
    originalPrice: 1195,
    description: "Ceylon sapphires suspended in white gold.",
    details:
      "Each earring suspends a 0.85ct oval Ceylon sapphire from a diamond-encrusted bail set in 18K white gold. The stones exhibit a rich cornflower blue with exceptional clarity. Suitable for pierced ears with butterfly backs included.",
    primaryImage: sapphireEarrings,
    hoverImage: rubyPendant,
  },
  {
    id: 5,
    name: "Ruby Heart Pendant",
    category: "Pendants",
    price: 1050,
    description: "Burmese ruby nestled in a rose-gold heart.",
    details:
      "A 0.95ct Burmese ruby of pigeon-blood red is bezel-set at the centre of a handcrafted 18K rose-gold heart. The pendant hangs on a 45 cm diamond-cut chain that is included. The ruby has been independently certified as natural and unheated.",
    primaryImage: rubyPendant,
    hoverImage: heroRing,
  },
  {
    id: 6,
    name: "Diamond Halo Earrings",
    category: "Earrings",
    price: 1190,
    originalPrice: 1199,
    description: "Brilliant-cut diamonds in a classic halo.",
    details:
      "Each stud features a 0.5ct round brilliant centre diamond encircled by a micro-pavé halo of 22 accent diamonds, totalling 1.44ctw per pair. Set in 18K white gold with secure screw-back fittings. GIA grading report included.",
    primaryImage: sapphireEarrings,
    hoverImage: heroRing,
  },
];

/* ─── Product Modal ─────────────────────────────────────────── */

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => (
  <AnimatePresence>
    {product && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 md:p-8"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[92vh] rounded-2xl bg-background border border-border shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-card/90 backdrop-blur border border-border text-muted-foreground hover:text-accent hover:border-accent transition-all duration-200 flex items-center justify-center"
            aria-label="Close product details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row overflow-auto max-h-[92vh]">
            {/* Image */}
            <div className="md:w-1/2 bg-silk/60 flex items-center justify-center p-6 min-h-[300px]">
              <img
                src={product.primaryImage}
                alt={product.name}
                className="w-full h-auto max-h-[70vh] object-contain rounded-xl"
              />
            </div>

            {/* Details */}
            <div className="md:w-1/2 p-8 flex flex-col justify-center gap-4">
              <p className="text-xs tracking-[0.25em] uppercase text-accent">
                {product.category}
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-foreground leading-tight">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3">
                <span className="text-xl font-semibold text-foreground">
                  ETB {product.price.toLocaleString()}.00
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ETB {product.originalPrice.toLocaleString()}.00
                  </span>
                )}
              </div>

              <div className="divider-gold my-1" aria-hidden="true" />

              <p className="text-muted-foreground leading-relaxed text-sm">
                {product.details}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <button className="btn-gold flex items-center justify-center gap-2 flex-1">
                  <ShoppingBag className="w-4 h-4" />
                  Buy Now
                </button>
                <button className="btn-outline-gold flex items-center justify-center gap-2 flex-1">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ─── Product Card ──────────────────────────────────────────── */

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product, onOpen }) => {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-accent/50 transition-all duration-500 cursor-pointer"
    >
      {/* Image wrapper */}
      <div
        className="relative aspect-square overflow-hidden bg-silk/60"
        onClick={() => onOpen(product)}
      >
        {/* Primary image */}
        <img
          src={product.primaryImage}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
          loading="lazy"
        />
        {/* Hover image */}
        <img
          src={product.hoverImage}
          alt={`${product.name} alternate view`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          loading="lazy"
        />

        {/* Action icons — slide in from right on hover */}
        <ul className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
          {[
            {
              icon: (
                <Heart
                  className={`w-4 h-4 ${wishlisted ? "fill-accent text-accent" : ""}`}
                />
              ),
              label: wishlisted ? "Remove Wishlist" : "Add to Wishlist",
              action: (e: React.MouseEvent) => {
                e.stopPropagation();
                setWishlisted((w) => !w);
              },
            },
            {
              icon: <ShoppingCart className="w-4 h-4" />,
              label: "Add to Cart",
              action: (e: React.MouseEvent) => e.stopPropagation(),
            },
            {
              icon: <Eye className="w-4 h-4" />,
              label: "Quick View",
              action: (e: React.MouseEvent) => {
                e.stopPropagation();
                onOpen(product);
              },
            },
          ].map(({ icon, label, action }, i) => (
            <li
              key={label}
              className="translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <button
                onClick={action}
                aria-label={label}
                title={label}
                className="w-9 h-9 rounded-full bg-background/90 backdrop-blur border border-border text-foreground hover:text-accent hover:border-accent transition-colors duration-200 flex items-center justify-center shadow-sm"
              >
                {icon}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Card info */}
      <div className="p-5" onClick={() => onOpen(product)}>
        <p className="text-xs tracking-[0.2em] uppercase text-accent mb-1">
          {product.category}
        </p>
        <h3 className="font-serif text-base font-semibold text-foreground group-hover:text-accent transition-colors duration-300 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-foreground">
              ETB {product.price.toLocaleString()}.00
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ETB {product.originalPrice.toLocaleString()}.00
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen(product);
            }}
            className="btn-gold !px-4 !py-1.5 text-sm !rounded-full"
          >
            Buy
          </button>
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = "ProductCard";

/* ─── Collections Page ──────────────────────────────────────── */

const Collections: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, []);

  if (isPageLoading) {
    return <PageLoader label="Loading Collection" />;
  }

  return (
    <>
      <main className="min-h-screen bg-background pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Page header */}
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.35em] uppercase text-accent mb-4">
              Exclusively Crafted
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Our Collection
            </h1>
            <div className="divider-gold max-w-xs mx-auto mt-6" aria-hidden="true" />
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpen={setSelectedProduct}
              />
            ))}
          </div>
        </div>
      </main>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};

export default Collections;
