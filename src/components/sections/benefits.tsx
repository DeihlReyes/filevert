import React from "react";

export default function BenefitsSection() {
  return (
    <section className="px-8 py-20 lg:px-0">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Why Choose Our File Converter?
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              Effortless Conversion Process
            </h3>
            <p className="text-muted-foreground">
              Our user-friendly interface guides you through the conversion
              process, making it simple for anyone to use, regardless of
              technical expertise.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Preserve Original Quality</h3>
            <p className="text-muted-foreground">
              Our advanced algorithms ensure that your converted files maintain
              the highest possible quality, preserving the integrity of your
              original content.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Fast and Reliable</h3>
            <p className="text-muted-foreground">
              With our optimized conversion engine, you can convert files
              quickly and reliably, saving you time and frustration.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">No Software Installation</h3>
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
