import Image from "next/image";

interface AuthLayoutProps {
  /** Path to the full-bleed left-panel image */
  imageSrc: string;
  imageAlt: string;
  /** Small overline label above the heading */
  label?: string;
  /** Main heading shown over the image */
  heading: string;
  /** Supporting text under the heading */
  subtext?: string;
  /** Form content rendered in the right panel */
  children: React.ReactNode;
}

/**
 * Shared two-column layout for auth pages (login / register).
 * Left: sticky full-height image panel.
 * Right: scrollable form panel.
 */
export default function AuthLayout({
  imageSrc,
  imageAlt,
  label = "AFRI TECHS SARLU",
  heading,
  subtext,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-1">
        {/* Left — sticky boxed panel (desktop only) */}
        <div className="hidden lg:block sticky top-0 w-1/2 h-screen shrink-0 bg-white p-8">
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="50vw"
              className="object-cover"
              priority
            />
            {/* Text overlay — top left, brand blue inside the image card */}
            <div className="absolute top-10 left-10 max-w-xs z-10 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/20">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0c2847]/70 hover:text-[#0c2847] transition-colors mb-6 group"
              >
                <svg
                  className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Retour à l&apos;accueil
              </a>
              <h1 className="text-2xl font-bold leading-tight mb-3 text-[#0c2847]">{heading}</h1>
              {subtext && (
                <p className="text-[#0c2847]/90 text-sm leading-relaxed">{subtext}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right — form panel, scrolls with the page */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white min-h-screen">
          <div className="w-full max-w-md font-sans">
            {/* Logo on mobile */}
            <div className="flex justify-center mb-8 lg:hidden">
              <Image
                src="/logo/logo.png"
                alt="AFRI TECHS"
                width={140}
                height={52}
                className="h-auto"
              />
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
