import { Testimonials } from "@/lib/data";
import React from "react";
import { TestimonialCard } from "../TestimonialCard";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="px-8 py-20 lg:px-0">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold">
          What Our Users Say
        </h2>
        <div className="grid gap-8 lg:grid-cols-3">
          {Testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
