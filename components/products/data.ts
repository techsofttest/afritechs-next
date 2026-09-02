import { ProductVariant } from "@/lib/api";

export interface Product {
  id: string;
  slug?: string;
  tag: string;
  category: string;
  categoryName: string;
  title: string;
  desc: string;
  img: string;
  price: string;
  priceValue: number;
  inStock: boolean;
  variants?: ProductVariant[];
}

export interface Category {
  id: string;
  slug?: string;
  name: string;
  img: string;
}

export const mockProducts: Product[] = [];
export const categoriesList: Category[] = [];

