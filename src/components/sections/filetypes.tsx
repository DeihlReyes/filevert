import { FileTypes } from "@/lib/data";
import React from "react";
import { FileTypeCard } from "../FileTypeCard";

export default function FileTypesSection() {
  return (
    <section id="file-types" className="bg-muted px-8 py-20 lg:px-0">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Supported File Types
        </h2>
        <div className="grid gap-5 lg:grid-cols-3 lg:gap-8">
          {FileTypes.map((fileType, index) => (
            <FileTypeCard
              key={index}
              title={fileType.title}
              description={fileType.description}
              formats={fileType.formats}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
