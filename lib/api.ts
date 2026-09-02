export interface HeroSlideItem {
  id: number | string;
  title: string;
  desc: string;
  img: string;
}

export interface SectorItem {
  id: number | string;
  title: string;
  slug: string;
  img: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku?: string;
  price: number;
  sale_price?: number | null;
  formattedPrice?: string;
}

export interface ProductItem {
  id: string;
  slug?: string;
  tag: string;
  category?: string;
  category_id?: string;
  categoryName?: string;
  title: string;
  desc: string;
  img: string;
  price?: string;
  priceValue?: number;
  inStock?: boolean;
  variants?: ProductVariant[];
}

export interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  title: string;
  img: string;
  image?: string;
  is_featured?: boolean;
}

export interface MegaMenuCategoryItem {
  id: string;
  slug: string;
  title: string;
  products: {
    id: string;
    slug?: string;
    title: string;
    desc: string;
    link: string;
    img?: string;
  }[];
}

export interface FeaturedCategoryItem {
  id: number | string;
  title: string;
  slug: string;
  products: ProductItem[];
}

export interface ProjectItem {
  id: string;
  slug?: string;
  tag: string;
  title: string;
  desc: string;
  location: string;
  img: string;
}

export interface ProjectDetailData {
  id: string;
  slug?: string;
  title: string;
  tag: string;
  serviceName: string;
  location: string;
  desc: string;
  rawDescription?: string;
  img: string;
  galleryImages: string[];
  related: ProjectItem[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  desc: string;
  image?: string;
  link?: string;
}

export interface ServiceDetailData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  desc: string;
  rawDescription?: string;
  image?: string;
  benefits: string[];
  projects: ProjectItem[];
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  longDesc?: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

export interface NewsDetailData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  date: string;
  author: string;
  category: string;
  benefits: string[];
  features: string[];
  related: NewsItem[];
}

export interface BannerItem {
  id: string;
  page?: string;
  title: string;
  desc: string;
  img: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  text: string;
  image?: string;
  initials: string;
  role?: string;
  location?: string;
  rating?: number;
}

export interface HomePageData {
  heroSliders: HeroSlideItem[];
  sectors: SectorItem[];
  featuredCategories: FeaturedCategoryItem[];
  flagshipProducts: ProductItem[];
  flagshipProjects: ProjectItem[];
  news: NewsItem[];
  banners: BannerItem[];
  testimonials: TestimonialItem[];
}

export interface ProductSpecItem {
  label: string;
  value: string;
}

export interface ProductFaqItem {
  q: string;
  a: string;
}

export interface ProductDetailData {
  id: string;
  slug?: string;
  sku?: string;
  title: string;
  tag: string;
  categoryName: string;
  desc: string;
  rawDescription?: string;
  img: string;
  price?: string;
  priceValue: number;
  inStock: boolean;
  variants?: ProductVariant[];
  galleryImages: string[];
  techSpecs: ProductSpecItem[];
  faqs: ProductFaqItem[];
  related: ProductItem[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchHomePageData(): Promise<HomePageData | null> {
  if (!API_BASE_URL) {
    console.error("NEXT_PUBLIC_API_URL environment variable is not defined!");
    return null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/home`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Failed to fetch home page data: ${res.status} ${res.statusText}`);
      return null;
    }

    const data: HomePageData = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching home page data from backend API:", error);
    return null;
  }
}

export async function fetchProductDetail(slugOrId: string): Promise<ProductDetailData | null> {
  if (!API_BASE_URL) {
    console.error("NEXT_PUBLIC_API_URL environment variable is not defined!");
    return null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/products/${slugOrId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Failed to fetch product details: ${res.status} ${res.statusText}`);
      return null;
    }

    const result = await res.json();
    if (result.status === "success" && result.data) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching product details for ${slugOrId}:`, error);
    return null;
  }
}

export async function fetchProducts(search?: string, category?: string): Promise<ProductItem[]> {
  if (!API_BASE_URL) {
    return [];
  }

  try {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);

    const res = await fetch(`${API_BASE_URL}/products?${params.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const result = await res.json();
    if (result.status === "success" && Array.isArray(result.data)) {
      return result.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function fetchCategories(): Promise<CategoryItem[]> {
  if (!API_BASE_URL) {
    return [];
  }

  try {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const result = await res.json();
    if (result.status === "success" && Array.isArray(result.data)) {
      return result.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function fetchNewsList(): Promise<NewsItem[]> {
  if (!API_BASE_URL) {
    return [];
  }

  try {
    const res = await fetch(`${API_BASE_URL}/news`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const result = await res.json();
    if (result.status === "success" && Array.isArray(result.data)) {
      return result.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching news list:", error);
    return [];
  }
}

export async function fetchNewsDetail(slugOrId: string): Promise<NewsDetailData | null> {
  if (!API_BASE_URL) {
    return null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/news/${slugOrId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const result = await res.json();
    if (result.status === "success" && result.data) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching news detail for ${slugOrId}:`, error);
    return null;
  }
}

export async function fetchProjectsList(search?: string, service?: string): Promise<ProjectItem[]> {
  if (!API_BASE_URL) {
    return [];
  }

  try {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (service) params.set("service", service);

    const res = await fetch(`${API_BASE_URL}/projects?${params.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const result = await res.json();
    if (result.status === "success" && Array.isArray(result.data)) {
      return result.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching projects list:", error);
    return [];
  }
}

export async function fetchProjectDetail(slugOrId: string): Promise<ProjectDetailData | null> {
  if (!API_BASE_URL) {
    return null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/projects/${slugOrId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const result = await res.json();
    if (result.status === "success" && result.data) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching project detail for ${slugOrId}:`, error);
    return null;
  }
}

export async function fetchServicesList(search?: string, featured?: boolean): Promise<ServiceItem[]> {
  if (!API_BASE_URL) {
    return [];
  }

  try {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (featured) params.set("featured", "true");

    const res = await fetch(`${API_BASE_URL}/services?${params.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const result = await res.json();
    if (result.status === "success" && Array.isArray(result.data)) {
      return result.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching services list:", error);
    return [];
  }
}

export async function fetchServiceDetail(slugOrId: string): Promise<ServiceDetailData | null> {
  if (!API_BASE_URL) {
    return null;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/services/${slugOrId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const result = await res.json();
    if (result.status === "success" && result.data) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching service detail for ${slugOrId}:`, error);
    return null;
  }
}

export async function fetchMegaMenu(): Promise<MegaMenuCategoryItem[]> {
  if (!API_BASE_URL) {
    return [];
  }

  try {
    const res = await fetch(`${API_BASE_URL}/categories/mega-menu`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const result = await res.json();
    if (result.status === "success" && Array.isArray(result.data)) {
      return result.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching mega menu data:", error);
    return [];
  }
}

export interface OrderItemPayload {
  product_id?: string | number;
  name?: string;
  qty: number;
  price?: number;
  sku?: string;
  variant_id?: string | number;
}

export interface OrderPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company?: string;
  country?: string;
  address: string;
  city: string;
  state?: string;
  zip?: string;
  notes?: string;
  items: OrderItemPayload[];
}

export async function submitOrder(payload: OrderPayload): Promise<{ status: string; message?: string; errors?: Record<string, string[]>; order?: any }> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://afritechs.test/api";

  try {
    const res = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Error submitting order to API:", error);
    return { status: "error", message: error.message || "Network error submitting order." };
  }
}

export async function registerCustomer(payload: { name: string; email: string; phone?: string; password: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://afritechs.test/api";
  try {
    const res = await fetch(`${baseUrl}/customer/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error: any) {
    return { status: "error", message: error.message || "Erreur réseau." };
  }
}

export async function verifyRegistrationCode(payload: { email: string; code: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://afritechs.test/api";
  try {
    const res = await fetch(`${baseUrl}/customer/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error: any) {
    return { status: "error", message: error.message || "Erreur réseau." };
  }
}

export async function resendRegistrationCode(payload: { email: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://afritechs.test/api";
  try {
    const res = await fetch(`${baseUrl}/customer/resend-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error: any) {
    return { status: "error", message: error.message || "Erreur réseau." };
  }
}

export async function loginCustomer(payload: { email: string; password: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://afritechs.test/api";
  try {
    const res = await fetch(`${baseUrl}/customer/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error: any) {
    return { status: "error", message: error.message || "Erreur réseau." };
  }
}

export async function forgotPasswordCustomer(payload: { email: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://afritechs.test/api";
  try {
    const res = await fetch(`${baseUrl}/customer/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error: any) {
    return { status: "error", message: error.message || "Erreur réseau." };
  }
}

export async function verifyOtpCustomer(payload: { email: string; otp: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://afritechs.test/api";
  try {
    const res = await fetch(`${baseUrl}/customer/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error: any) {
    return { status: "error", message: error.message || "Erreur réseau." };
  }
}

export async function resetPasswordCustomer(payload: { email: string; otp: string; password: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://afritechs.test/api";
  try {
    const res = await fetch(`${baseUrl}/customer/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error: any) {
    return { status: "error", message: error.message || "Erreur réseau." };
  }
}


