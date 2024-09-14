import React from "react";
import { FeatureCard } from "../FeatureCard";
import { Features } from "@/lib/data";

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-muted px-8 py-20 lg:px-0">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-2xl font-bold md:text-3xl">
          Powerful Features for All Your Conversion Needs
        </h2>
        <div className="grid gap-5 md:grid-cols-3 lg:gap-8">
          {Features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
