import Link from "next/link";

import { Button } from "@/components/ui/button";

export const CallToAction = () => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl rounded-3xl border px-6 py-12 md:py-20 lg:py-32">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Start Building
          </h2>
          <p className="mt-4">
            Join thousands of people experimenting intuitive writing with Noter
            AI.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/dashboard">
                <span>Get Started</span>
              </Link>
            </Button>

            {/* <Button asChild size="lg" variant="outline">
              <Link href={"/book-demo"}>
                <span>Book Demo</span>
              </Link>
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  );
};
