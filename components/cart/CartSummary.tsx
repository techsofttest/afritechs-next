import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartSummaryProps {
  items: CartItem[];
  subtotal: number;
  total: number;
}

export default function CartSummary({
  items,
  subtotal,
  total,
}: CartSummaryProps) {
  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 p-6 sticky top-[110px]">
      <h3 className="text-[14px] font-semibold text-[#0c2847] mb-5 pb-2 border-b border-gray-200 flex items-center gap-2">
        <svg
          className="w-4.5 h-4.5 text-[#0c2847]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
        Récapitulatif de la demande
      </h3>

      {/* Mini product images list in summary */}
      <div className="flex flex-col gap-3 mb-5 pb-4 border-b border-gray-100">
        <p className="text-[11px] text-gray-900 font-medium font-sans">
          Articles inclus :
        </p>
        <div className="flex flex-wrap gap-2.5">
          {items.map((item) => (
            <div
              key={`summary-${item.id}`}
              className="relative w-10 h-10 rounded-md border border-gray-200 overflow-visible bg-white p-0.5"
              title={item.name}
            >
              <div className="relative w-full h-full rounded overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="absolute -top-1.5 -right-1.5 bg-[#0c2847] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-semibold z-10">
                {item.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3.5 mb-6 text-[13px]">
        <div className="flex justify-between items-center text-gray-900">
          <span className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-gray-900"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            Sous-total articles :
          </span>
          <span className="font-semibold text-[#0c2847]">
            <span translate="no" className="notranslate">
              {subtotal.toLocaleString("fr-FR")}
            </span>{" "}
            €
          </span>
        </div>

        <div className="border-t border-gray-100 pt-3.5 flex justify-between items-center text-base font-semibold text-[#0c2847]">
          <span>Total de la demande :</span>
          <span className="text-[24px]">
            <span translate="no" className="notranslate">
              {total.toLocaleString("fr-FR")}
            </span>{" "}
            €
          </span>
        </div>
      </div>

      <Link href="/checkout" className="block w-full">
        <Button
          variant="primary"
          className="w-full py-4 text-base font-semibold text-center flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          Continuer
        </Button>
      </Link>

      <Link
        href="/products"
        className="block text-center text-xs font-semibold text-[#0c2847] hover:underline mt-4 transition-colors flex items-center justify-center gap-1.5"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Continuer mes achats
      </Link>
    </div>
  );
}
