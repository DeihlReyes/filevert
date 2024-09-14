import React from "react";

export default function BenefitsSection() {
  return (
    <section id="benefits" className="px-8 py-20 lg:px-0">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-2xl font-bold md:text-3xl">
          Why Choose Our File Converter?
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold md:text-xl">
              Effortless Conversion Process
            </h3>
            <p className="text-muted-foreground">
              Our user-friendly interface guides you through the conversion
              process, making it simple for anyone to use, regardless of
              technical expertise.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold md:text-xl">
              Preserve Original Quality
            </h3>
            <p className="text-muted-foreground">
              Our advanced algorithms ensure that your converted files maintain
              the highest possible quality, preserving the integrity of your
              original content.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold md:text-xl">
              Fast and Reliable
            </h3>
            <p className="text-muted-foreground">
              With our optimized conversion engine, you can convert files
              quickly and reliably, saving you time and frustration.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold md:text-xl">
              No Software Installation
            </h3>
            <p className="text-muted-foreground">
              As a web-based solution, you can use our converter on any device
              without the need to install additional software, ensuring
              convenience and flexibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
