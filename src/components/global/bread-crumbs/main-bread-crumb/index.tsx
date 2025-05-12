import { PAGE_ICON } from "@/constants/pages";
import React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class merging

type Props = {
  page: string;
  slug?: string;
  className?: string;
};

const MainBreadCrumb = ({ page, slug, className }: Props) => {
  const isHomePage = page === "Home";
  const pageTitle = isHomePage ? `${slug}!` : page;
  const PageIcon = PAGE_ICON[page.toUpperCase()];

  return (
    <div className={cn("flex flex-col w-full", className)}>
      {isHomePage && (
        <div className="flex justify-center w-full mb-2">
          <div className="bg-gradient-to-r from-primary/10 to-transparent w-full max-w-2xl py-6 lg:py-8 flex flex-col items-center rounded-lg">
            <p className="text-muted-foreground text-lg lg:text-xl">Welcome back</p>
            <h1 className="text-4xl lg:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              {pageTitle}
            </h1>
          </div>
        </div>
      )}
      
      {!isHomePage && (
        <div className="flex items-center gap-3 py-4 lg:py-6 px-4 bg-gradient-to-r from-primary/10 to-transparent rounded-lg">
          {PageIcon && (
            <span className="text-primary/80">
              {React.cloneElement(PageIcon, { className: "w-6 h-6 lg:w-7 lg:h-7" })}
            </span>
          )}
          <h2 className="text-2xl lg:text-3xl font-semibold text-foreground capitalize">
            {pageTitle}
          </h2>
        </div>
      )}
    </div>
  );
};

export default MainBreadCrumb;