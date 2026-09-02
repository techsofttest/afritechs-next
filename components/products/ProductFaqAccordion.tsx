import React from "react";

interface FaqItem {
  q: string;
  a: string;
}

interface ProductFaqAccordionProps {
  faqs: FaqItem[];
  activeFaq: number | null;
  toggleFaq: (index: number) => void;
}

export default function ProductFaqAccordion({
  faqs,
  activeFaq,
  toggleFaq
}: ProductFaqAccordionProps) {
  return (
    <div className="px-4 md:px-8 lg:px-0">
      <h2 className="text-[24px] font-bold text-[#0c2847] uppercase tracking-wider mb-6 pb-2 border-b border-gray-100 font-sans">
        Questions Fréquentes
      </h2>
      <div className="flex flex-col gap-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="rounded-lg bg-[#f8f9fa] overflow-hidden">
            <button
              onClick={() => toggleFaq(idx)}
              className="w-full flex justify-between items-center p-5 text-left font-bold text-[16px] text-[#0c2847] hover:bg-gray-200/40 transition-colors cursor-pointer"
            >
              <span>{faq.q}</span>
              <span className="text-[20px]">{activeFaq === idx ? "−" : "+"}</span>
            </button>
            {activeFaq === idx && (
              <div className="p-6 bg-white text-[16px] text-[#0c2847] font-semibold leading-relaxed font-sans">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
