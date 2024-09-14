import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CallToActionSection() {
  return (
    <section className="bg-primary px-8 py-20 text-primary-foreground lg:px-0">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">
          Ready to Convert Your Files?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl">
          Join thousands of satisfied users who trust our platform for their
          file conversion needs.
        </p>
        <Button asChild size="lg" variant="secondary">
          <Link href="/convert">
            Get Started Now <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
