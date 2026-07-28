/// <reference types="vite/client" />

declare module "react-responsive-masonry" {
  import { ComponentType, ReactNode } from "react";

  interface MasonryProps {
    columnsCount?: number;
    gutter?: string;
    className?: string;
    children?: ReactNode;
  }

  interface ResponsiveMasonryProps {
    columnsCountBreakPoints?: Record<number, number>;
    className?: string;
    children?: ReactNode;
  }

  const Masonry: ComponentType<MasonryProps>;
  export const ResponsiveMasonry: ComponentType<ResponsiveMasonryProps>;
  export default Masonry;
}
