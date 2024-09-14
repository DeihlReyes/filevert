import hero from "@/assets/hero.svg";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl space-y-6 px-8 py-20 text-center lg:px-0">
      <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
        Convert Your Files with Ease and Precision
      </h1>
      <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl">
        Transform video, image, and audio files effortlessly. Our advanced
        conversion technology ensures top-quality results every time.
      </p>
      <div className="flex flex-col justify-center gap-4 md:flex-row">
        <Button asChild size="lg">
          <Link href="/convert">Start Converting Now</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="#features">Learn More</Link>
        </Button>
      </div>
      <div className="mt-10 flex items-center justify-center">
        <Image
          src={hero}
          alt="File Converter Interface"
          width={600}
          height={500}
        />
      </div>
    </section>
  );
}
