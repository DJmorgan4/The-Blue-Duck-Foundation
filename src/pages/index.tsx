import Head from "next/head";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>The Blue Duck Foundation</title>
        <meta name="description" content="Conservation through stewardship." />
      </Head>

      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
        </main>
        <Footer />
      </div>
    </>
  );
}

