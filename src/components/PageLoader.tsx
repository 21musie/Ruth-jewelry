import React, { memo } from "react";

interface PageLoaderProps {
  label: string;
}

const PageLoader: React.FC<PageLoaderProps> = memo(({ label }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center">
          <span className="absolute h-24 w-24 rounded-full border border-accent/25 animate-ping" />
          <span className="absolute h-16 w-16 rounded-full border border-accent/40" />
          <span className="h-10 w-10 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        </div>
        <p className="text-sm tracking-[0.24em] uppercase text-muted-foreground">
          {label}
        </p>
      </div>
    </div>
  );
});

PageLoader.displayName = "PageLoader";

export default PageLoader;
