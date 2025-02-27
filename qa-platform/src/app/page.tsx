import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to PathFinders Conference<br/> Q&A Platform
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join our community to ask questions, share knowledge, and
                  learn from others.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/qa">
                  <Button size="lg">Start Exploring</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            (c) 2025 PathFinders Conference Q&A Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export const dynamic = 'force-dynamic';