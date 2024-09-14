import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqsSection() {
  return (
    <section className="bg-muted px-8 py-20 lg:px-0">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Frequently Asked Questions
        </h2>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full max-w-3xl"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it free to use?</AccordionTrigger>
            <AccordionContent>
              Yes, our basic conversion services are completely free to use. We
              also offer premium features for users who require advanced options
              or higher volume conversions.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              How secure are my uploaded files?
            </AccordionTrigger>
            <AccordionContent>
              We take security seriously. All uploaded files are encrypted and
              automatically deleted from our servers after conversion. We never
              access or share your files.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What&apos;s the maximum file size I can convert?
            </AccordionTrigger>
            <AccordionContent>
              Free users can convert files up to 100MB in size. Premium users
              enjoy higher limits, with the ability to convert files up to 2GB.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              How long does the conversion process take?
            </AccordionTrigger>
            <AccordionContent>
              Conversion times vary depending on the file size and type, but
              most conversions are completed within a few minutes. Larger files
              may take longer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
