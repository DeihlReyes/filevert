import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

// Type for FileTypeCard props
interface FileTypeCardProps {
  title: string;
  description: string;
  formats: string[];
}

export function FileTypeCard({
  title,
  description,
  formats,
}: FileTypeCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-3 gap-2">
          {formats.map((format) => (
            <li key={format} className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-primary" />
              {format}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
