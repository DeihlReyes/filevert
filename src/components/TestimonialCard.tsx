import { Card, CardContent } from "@/components/ui/card";
import { Globe } from "lucide-react";

// Type for TestimonialCard props
interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <Globe className="h-8 w-8 text-primary" />
        </div>
        <blockquote className="text-lg mb-4">&quot;{quote}&quot;</blockquote>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
}
