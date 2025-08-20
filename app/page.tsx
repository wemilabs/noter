import { Hero } from "@/components/hero";
import { Header } from "@/components/header";
import { Features } from "@/components/features";
import { CallToAction } from "@/components/call-to-action";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
    </main>
  );
}
