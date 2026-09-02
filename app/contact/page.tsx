import React from "react";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import ContactForm from "@/components/contact/ContactForm";
import PageBanner from "@/components/global/PageBanner";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#0c2847]">
      <Header forceSolidBg />

      {/* Hero Section */}
      <PageBanner
        title={<>Contactez-nous <br /> Contact Afri-techs</>}
        subtitle={<>Nous sommes à votre écoute pour répondre <br />à toutes vos questions et besoins.</>}
        imageSrc="/banner/contact-page.png"
        imageAlt="Contact Afri Techs"
      />

      {/* Contact Section */}
      <section className="py-12 md:py-20 px-6 md:px-16 lg:px-24 w-full max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* Contact Details */}
          <div className="flex flex-col items-start">
            <h2 className="text-[24px] md:text-[28px] lg:text-[34px] font-semibold text-[#0c2847] uppercase tracking-wider relative inline-block pb-3 md:pb-4 mb-6 md:mb-8 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 md:after:w-20 after:h-1 after:bg-brand">
              Nos Coordonnées
            </h2>
            <p className="text-gray-700 text-sm md:text-base lg:text-lg mb-8 leading-relaxed font-medium">
              N&apos;hésitez pas à nous contacter directement ou à utiliser le formulaire de contact pour nous faire part de vos projets ou questions.
            </p>

            <div className="flex flex-col gap-5 md:gap-6 w-full">
              {/* Address */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 flex items-center justify-center rounded-full text-brand border border-gray-100 shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-base md:text-lg text-[#0c2847] mb-1">Adresse</h4>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium">
                    Flat No: 101, Sangare Apartments C. Ratoma,<br />
                    Conakry,<br />
                    Republic Of Guinee
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 flex items-center justify-center rounded-full text-brand border border-gray-100 shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-base md:text-lg text-[#0c2847] mb-1">Téléphone</h4>
                  <a href="tel:+224660252121" className="text-gray-700 text-sm md:text-base leading-relaxed font-medium hover:text-brand transition-colors">
                    +224 660 252 121
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 flex items-center justify-center rounded-full text-brand border border-gray-100 shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-base md:text-lg text-[#0c2847] mb-1">Email</h4>
                  <a href="mailto:arunnath@afri-techs.com" className="text-gray-700 text-sm md:text-base leading-relaxed font-medium hover:text-brand transition-colors">
                    arunnath@afri-techs.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Component */}
          <ContactForm />

        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[450px] relative border-t border-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15764.084126297079!2d-13.6738927!3d9.5694857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf1cd13000000001%3A0x6b8ecae0e2d1d0ab!2sRatoma%2C%20Conakry%2C%20Guinea!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Afri-techs Location Map"
        ></iframe>
      </section>

      <Footer />
    </div>
  );
}
