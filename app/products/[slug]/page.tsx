"use client";

import { useState, useMemo, use, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import Card from "@/components/ui/Card";

// Sub-components imports
import Breadcrumb from "@/components/products/Breadcrumb";
import ProductGallery from "@/components/products/ProductGallery";
import ProductDetailsInfo from "@/components/products/ProductDetailsInfo";
import ProductSpecsTable from "@/components/products/ProductSpecsTable";
import ProductFaqAccordion from "@/components/products/ProductFaqAccordion";
import ProductOrderCTA from "@/components/products/ProductOrderCTA";
import Button from "@/components/ui/Button";

import { fetchProductDetail, ProductDetailData, ProductVariant } from "@/lib/api";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const [product, setProduct] = useState<ProductDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [variantSelectionError, setVariantSelectionError] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(true);
  const [activeImage, setActiveImage] = useState<string>("");
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    fetchProductDetail(slug).then((data) => {
      if (isMounted) {
        setProduct(data);
        if (data?.img) {
          setActiveImage(data.img);
        } else if (data?.galleryImages && data.galleryImages.length > 0) {
          setActiveImage(data.galleryImages[0]);
        }

        // Handle variant auto-selection if 1 variant exists
        if (data?.variants && data.variants.length === 1) {
          setSelectedVariant(data.variants[0]);
        } else {
          setSelectedVariant(null);
        }

        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleSelectVariant = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setVariantSelectionError(false);
  };

  const handleAddToCartAttempt = (): boolean => {
    if (product?.variants && product.variants.length > 0 && !selectedVariant) {
      setVariantSelectionError(true);
      const elem = document.getElementById("variants-selection-section");
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return false;
    }
    setVariantSelectionError(false);
    return true;
  };

  // Gallery images from API response
  const galleryImages = useMemo(() => {
    if (!product) return [];
    if (product.galleryImages && product.galleryImages.length > 0) {
      return product.galleryImages;
    }
    return product.img ? [product.img] : [];
  }, [product]);

  // Pricing calculations based on selected variant or product default price
  const basePrice = useMemo(() => {
    if (selectedVariant) {
      return selectedVariant.sale_price ?? selectedVariant.price;
    }
    return product?.priceValue ?? 0;
  }, [selectedVariant, product]);

  const tier1Price = basePrice;
  const tier2Price = Math.round(basePrice * 0.95);
  const tier3Price = Math.round(basePrice * 0.90);

  // Current price based on quantity
  const currentPrice = useMemo(() => {
    if (quantity >= 10) return tier3Price;
    if (quantity >= 5) return tier2Price;
    return tier1Price;
  }, [quantity, tier1Price, tier2Price, tier3Price]);

  const subtotal = currentPrice * quantity;

  // Recommendations from API response
  const recommendations = useMemo(() => {
    return product?.related ?? [];
  }, [product]);

  // Default product FAQs fallback
  const defaultFaqs = useMemo(() => [
    {
      q: "Comment puis-je obtenir un devis pour ce produit ?",
      a: "Vous pouvez cliquer sur le bouton \"Faire une demande de devis\" ou contacter notre équipe. Nos experts vous transmettront une offre tarifaire personnalisée sous 24 à 48 heures."
    },
    {
      q: "Quels sont les délais et modalités de livraison ?",
      a: "Nous assurons la livraison et le déploiement de nos équipements dans toute la République de Guinée et dans la sous-région selon vos spécifications."
    },
    {
      q: "Ce produit bénéficie-t-il d'une garantie et d'un support technique ?",
      a: "Oui, tous nos équipements et produits disposent d'une garantie et de l'assistance technique dédiée garantie par AFRI TECHS SARLU."
    },
    {
      q: "Fournissez-vous les pièces de rechange et la maintenance ?",
      a: "Absolument. Nous mettons à disposition des pièces détachées d'origine et offrons un service après-vente et de maintenance réactif."
    }
  ], []);

  const productFaqs = (product?.faqs && product.faqs.length > 0) ? product.faqs : defaultFaqs;

  // Carousel hooks & State
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start"
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  // Toggle FAQ accordion
  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Observer to hide bottom bar when footer is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBottomBarVisible(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
      }
    );

    const currentFooterRef = footerRef.current;
    if (currentFooterRef) {
      observer.observe(currentFooterRef);
    }

    return () => { if (currentFooterRef) observer.unobserve(currentFooterRef) };
  }, []);

  // Dynamic breadcrumb path
  const breadcrumbItems = useMemo(() => {
    if (!product) {
      return [
        { label: "Produits", href: "/products" },
        { label: "Détails" }
      ];
    }
    return [
      { label: "Produits", href: "/products" },
      { label: product.title }
    ];
  }, [product]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white text-[#0c2847]">
        <Header forceSolidBg={true} />
        <main className="flex-1 w-full pt-[120px] pb-24 text-center">
          <div className="max-w-[1440px] mx-auto px-6">
            <div className="inline-block w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Chargement des détails du produit...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-white text-[#0c2847]">
        <Header forceSolidBg={true} />
        <main className="flex-1 w-full pt-[120px] pb-24 text-center">
          <div className="max-w-[1440px] mx-auto px-6">
            <h1 className="text-2xl font-bold mb-4">Produit introuvable</h1>
            <p className="text-gray-500 mb-6">Le produit demandé n'existe pas ou n'est plus disponible.</p>
            <a
              href="/products"
              className="inline-block bg-[#0c2847] text-white px-6 py-2.5 rounded-sm font-semibold hover:bg-brand transition-colors"
            >
              Retour aux produits
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#0c2847]">
      <Header forceSolidBg={true} />

      <main className="flex-1 w-full pt-[80px]">
        {/* Reused Breadcrumb Component */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Unified Grid Layout for Page-Long Sticky Column */}
        <section className="w-full max-w-[1440px] mx-auto px-0 lg:px-12 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* LEFT COLUMN: Contains product details and all lower sections (lg:col-span-8) */}
            <div className="lg:col-span-8 flex flex-col gap-16">

              {/* Upper Section: Gallery & Details side by side */}
              <div className="flex flex-col lg:flex-row gap-10 items-start px-4 md:px-8 lg:px-0">

                {/* Image Gallery Component */}
                <ProductGallery
                  galleryImages={galleryImages}
                  activeImage={activeImage || product.img}
                  setActiveImage={setActiveImage}
                  title={product.title}
                />

                {/* Details & Price Component */}
                <div className="flex-1 min-w-0 w-full">
                  <ProductDetailsInfo
                    tag={product.tag}
                    title={product.title}
                    categoryName={product.categoryName}
                    tier1Price={tier1Price}
                    tier2Price={tier2Price}
                    tier3Price={tier3Price}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    keyAttributes={[]}
                    variants={product.variants}
                    selectedVariant={selectedVariant}
                    onSelectVariant={handleSelectVariant}
                    variantSelectionError={variantSelectionError}
                  />
                </div>

              </div>

              {/* CTA for Mobile/Tablet - Placed below details, hidden on desktop */}
              <div className="lg:hidden w-full px-4 md:px-8 lg:px-0 -mt-8">
                <ProductOrderCTA
                  currentPrice={currentPrice}
                  subtotal={subtotal}
                  quantity={quantity}
                  selectedVariant={selectedVariant}
                  hasVariants={Boolean(product.variants && product.variants.length > 0)}
                  onAddToCartAttempt={handleAddToCartAttempt}
                  product={{
                    id: product.id,
                    title: product.title,
                    img: product.img,
                    price: product.price || "0 €",
                    priceValue: product.priceValue,
                    categoryName: product.categoryName
                  }}
                />
              </div>

              {/* Technical Specifications Component */}
              <ProductSpecsTable
                desc={product.desc}
                techSpecs={product.techSpecs}
              />

              {/* Gallery Grid */}
              {galleryImages.length > 0 && (
                <div className="px-4 md:px-8 lg:px-0">
                  <h2 className="text-[24px] font-bold text-[#0c2847] uppercase tracking-wider mb-6 pb-2 border-b border-gray-100 font-sans ">
                    Galerie Images
                  </h2>

                  <div className="flex flex-col gap-2">
                    {/* First 4 images as 2-column grid */}
                    <div className="grid grid-cols-2 gap-2">
                      {galleryImages.slice(0, 4).map((imgUrl, idx) => (
                        <div key={idx} className="relative aspect-square rounded-sm overflow-hidden bg-[#f8f9fa] hover:opacity-95 transition-opacity">
                          <Image src={imgUrl} alt={`Product detail top ${idx}`} fill sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 250px" className="object-cover" />
                        </div>
                      ))}
                    </div>

                    {/* Remaining images (index 4+) as 3-column grid below */}
                    {galleryImages.length > 4 && (
                      <div className="grid grid-cols-3 gap-2">
                        {galleryImages.slice(4).map((imgUrl, idx) => (
                          <div key={idx} className="relative aspect-square rounded-sm overflow-hidden bg-[#f8f9fa] hover:opacity-95 transition-opacity">
                            <Image src={imgUrl} alt={`Product detail bottom ${idx}`} fill sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 180px" className="object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* FAQ Accordion Component */}
              <ProductFaqAccordion
                faqs={productFaqs}
                activeFaq={activeFaq}
                toggleFaq={toggleFaq}
              />

              {/* Recommendations Section */}
              {recommendations.length > 0 && (
                <div className="px-4 md:px-8 lg:px-0">
                  <h2 className="text-[24px] font-bold text-[#0c2847] uppercase tracking-wider mb-8 font-sans">
                    Produits Recommandés
                  </h2>

                  <div className="relative">
                    {/* Embla Viewport */}
                    <div className="overflow-hidden lg:-ml-6" ref={emblaRef}>
                      <div className="flex -ml-6 select-none">
                        {recommendations.map((rec) => (
                          <div
                            key={rec.id}
                            className="flex-[0_0_50%] min-w-0 md:flex-[0_0_40%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] pl-6 flex flex-col text-left shrink-0"
                          >
                            <Card
                              tag={rec.tag}
                              title={rec.title}
                              desc={rec.desc}
                              img={rec.img}
                              price={rec.price}
                              buttonText="Faire une demande"
                              onCardClick={() => window.location.href = `/products/${rec.slug || rec.id}`}
                              onButtonClick={() => {
                                const event = new CustomEvent("open-request-modal", {
                                  detail: {
                                    id: rec.id,
                                    title: rec.title,
                                    img: rec.img,
                                    price: rec.price || "0 €",
                                    priceValue: rec.priceValue || 0,
                                    categoryName: rec.tag
                                  }
                                });
                                window.dispatchEvent(event);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Left/Right Floating Navigation Buttons */}
                    <button
                      onClick={scrollPrev}
                      className="absolute left-0 lg:-left-4 top-1/3 -translate-y-1/2 z-20 w-8 h-8 bg-[#1f2937] hover:bg-[#374151] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer rounded-sm"
                      aria-label="Solutions précédentes"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={scrollNext}
                      className="absolute right-0 lg:-right-4 top-1/3 -translate-y-1/2 z-20 w-8 h-8 bg-[#1f2937] hover:bg-[#374151] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer rounded-sm"
                      aria-label="Solutions suivantes"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Horizontal Line Pagination Dots */}
                  <div className="flex justify-center items-center gap-2 pt-8">
                    {recommendations.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${selectedIndex === index ? "w-12 bg-[#0c2847]" : "w-1.5 bg-gray-400 hover:bg-gray-600"
                          }`}
                        aria-label={`Slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT COLUMN: Sticky CTA Panel (lg:col-span-4) */}
            <div className="hidden lg:block lg:col-span-4 sticky top-[120px] z-20">
              <ProductOrderCTA
                currentPrice={currentPrice}
                subtotal={subtotal}
                quantity={quantity}
                selectedVariant={selectedVariant}
                hasVariants={Boolean(product.variants && product.variants.length > 0)}
                onAddToCartAttempt={handleAddToCartAttempt}
                product={{
                  id: product.id,
                  title: product.title,
                  img: product.img,
                  price: product.price || "0 €",
                  priceValue: product.priceValue,
                  categoryName: product.categoryName
                }}
              />
            </div>

          </div>
        </section>
      </main>

      <div ref={footerRef}>
        <Footer />
      </div>

      {/* Mobile Fixed Bottom Action Bar */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-3 z-50 lg:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.05)] transition-transform duration-300 ${isBottomBarVisible ? "translate-y-0" : "translate-y-full"}`}>
        <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
          <Button
            variant="secondary"
            className="w-full justify-center py-3 text-[14px] font-bold gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            Chatter maintenant
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (!handleAddToCartAttempt()) {
                return;
              }
              const event = new CustomEvent("open-request-modal", {
                detail: {
                  id: product.id,
                  title: product.title,
                  img: product.img,
                  price: currentPrice > 0 ? `${currentPrice.toLocaleString("fr-FR")} €` : (product.price || "0 €"),
                  priceValue: currentPrice || product.priceValue,
                  categoryName: product.categoryName,
                  quantity: quantity,
                  variantId: selectedVariant?.id,
                  variantName: selectedVariant?.name,
                  variantSku: selectedVariant?.sku,
                  skipModal: true
                }
              });
              window.dispatchEvent(event);
            }}
            className="w-full justify-center py-3 text-[14px] font-bold gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Faire une demande de devis
          </Button>
        </div>
      </div>
    </div>
  );
}
