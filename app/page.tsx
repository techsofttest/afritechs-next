import Header from "@/components/global/Header";
import Hero from "@/components/home/Hero";
import CompanyIntroduction from "@/components/home/CompanyIntroduction";
import ExploreSectors from "@/components/home/ExploreSectors";
import Banner from "@/components/ui/Banner";
import FeaturedSolutions from "@/components/home/FeaturedSolutions";
import News from "@/components/home/News";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Advantages from "@/components/home/Advantages";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import Footer from "@/components/global/Footer";
import Reveal from "@/components/ui/Reveal";
import { fetchHomePageData } from "@/lib/api";

export const revalidate = 0;

export default async function Home() {
  const data = await fetchHomePageData();

  const heroSliders = data?.heroSliders ?? [];
  const sectors = data?.sectors ?? [];
  const featuredCategories = data?.featuredCategories ?? [];
  const flagshipProducts = data?.flagshipProducts ?? [];
  const flagshipProjects = data?.flagshipProjects ?? [];
  const news = data?.news ?? [];
  const banners = data?.banners ?? [];
  const testimonials = data?.testimonials ?? [];

  const missionBanner = banners.find((b) => b.page === "mission") || (banners.length > 0 ? banners[0] : null);
  const agroBanner = banners.find((b) => b.page === "agro") || (banners.length > 1 ? banners[1] : null);

  return (
    <div className="flex flex-col flex-1 w-full bg-white text-[#0c2847]">
      <Header />

      <main className="flex flex-1 w-full flex-col items-center">
        {heroSliders.length > 0 && <Hero slides={heroSliders} />}

        {sectors.length > 0 && (
          <Reveal className="w-full">
            <ExploreSectors sectors={sectors} />
          </Reveal>
        )}

        {/* Dynamic Featured Categories sections */}
        {featuredCategories.map((cat) => (
          cat.products.length > 0 && (
            <Reveal key={cat.id} className="w-full">
              <FeaturedSolutions title={cat.title} products={cat.products} />
            </Reveal>
          )
        ))}

        {/* Static Mission Banner */}
        <Banner
          bgImage="/banner/mission-banner2.png"
          title="Nous croyons que l'innovation propulse l'avenir."
          desc="La mission d'AFRI TECHS SARLU est de fournir des solutions durables et performantes dans l'agriculture, l'énergie, et l'industrie pour contribuer au développement économique de l'Afrique."
          buttonText="Notre Mission"
          buttonLink="/about"
        />

        {/* Flagship Products / Solutions */}
        {flagshipProducts.length > 0 && (
          <Reveal className="w-full">
            <FeaturedSolutions title="Nos Solutions Phares" products={flagshipProducts} />
          </Reveal>
        )}

        {/* Static Agriculture & Services Banner */}
        <Banner
          bgImage="/banner/farm-banner2.png"
          title={<>Moderniser l'agriculture <br /> pour nourrir l'avenir.</>}
          desc={<>AFRI TECHS accompagne la transition agricole africaine avec des technologies de pointe : machinerie moderne, outils de précision et systèmes d'irrigation intelligents.</>}
          buttonText="Nos Services"
          buttonLink="/services"
        />

        {/* Flagship Projects */}
        {flagshipProjects.length > 0 && (
          <Reveal className="w-full">
            <FeaturedProjects projects={flagshipProjects} />
          </Reveal>
        )}

        <CompanyIntroduction />

        {/* News and Developments */}
        {news.length > 0 && (
          <Reveal className="w-full">
            <News news={news} />
          </Reveal>
        )}

        <Reveal className="w-full">
          <Advantages />
        </Reveal>

        {testimonials.length > 0 && (
          <Reveal className="w-full">
            <Testimonials testimonials={testimonials} />
          </Reveal>
        )}

        <CTA />
      </main>

      <Footer />
    </div>
  );
}