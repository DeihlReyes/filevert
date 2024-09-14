import React from "react";
import { StepCard } from "../StepCard";
import { Steps } from "@/lib/data";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-8 py-20 lg:px-0">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-2xl font-bold md:text-3xl">
          How It Works
        </h2>
        <div className="grid gap-5 md:grid-cols-3 lg:gap-8">
          {Steps.map((step) => (
            <StepCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
