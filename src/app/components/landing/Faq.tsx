import { Section, Container, SectionHeading } from "./Section";
import { SectionReveal } from "../shared/SectionReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useSanyonara } from "../../store/SanyonaraContext";

export function Faq() {
  const { data } = useSanyonara();
  return (
    <Section id="faq" className="bg-card">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Pertanyaan yang Sering Diajukan"
          description="Belum menemukan jawaban? Hubungi kami langsung via WhatsApp."
        />

        <SectionReveal className="mx-auto mt-10 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {data.faq.map((f) => (
              <AccordionItem
                key={f.id}
                value={f.id}
                className="mb-3 rounded-2xl border border-border bg-background px-5"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionReveal>
      </Container>
    </Section>
  );
}
