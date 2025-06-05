import { Accordion } from "@/components/ui/accordion";
import MotionDiv from '@/components/motion/motion-div';
import FaqItemClient from "@/components/common/faq-item-client";

const faqs = [
  {
    value: "item-1",
    question: "What kind of AI solutions does Xoire offer?",
    answer: "Xoire provides a comprehensive suite of AI solutions, including custom AI model development, machine learning operations (MLOps), AI-driven automation for various business processes, advanced analytics, natural language processing (NLP) applications like chatbots, and computer vision systems.",
    answerTextForAudio: "Xoire provides a comprehensive suite of AI solutions, including custom AI model development, machine learning operations (MLOps), AI-driven automation for various business processes, advanced analytics, natural language processing applications like chatbots, and computer vision systems.",
  },
  {
    value: "item-2",
    question: "How does Xoire ensure the security and privacy of my data?",
    answer: "Data security and privacy are paramount at Xoire. We implement robust security measures, including end-to-end encryption, access controls, regular security audits, and compliance with industry-standard data protection regulations (like GDPR, CCPA). Our AI systems are designed with privacy-preserving techniques.",
    answerTextForAudio: "Data security and privacy are paramount at Xoire. We implement robust security measures, including end-to-end encryption, access controls, regular security audits, and compliance with industry-standard data protection regulations. Our AI systems are designed with privacy-preserving techniques.",
  },
  {
    value: "item-3",
    question: "What industries does Xoire specialize in?",
    answer: "While our AI solutions are adaptable across many sectors, we have significant expertise in finance (algorithmic trading, fraud detection), e-commerce (personalization, recommendation engines), healthcare (diagnostics, patient care automation), and manufacturing (predictive maintenance, quality control).",
    answerTextForAudio: "While our AI solutions are adaptable across many sectors, we have significant expertise in finance, e-commerce, healthcare, and manufacturing.",
  },
  {
    value: "item-4",
    question: "How long does it typically take to implement an AI solution?",
    answer: "The timeline for AI implementation varies depending on the project's complexity, data availability, and specific requirements. A pilot project or proof-of-concept might take a few weeks to a couple of months, while full-scale enterprise solutions can take longer. We prioritize agile development for rapid iterations and value delivery.",
    answerTextForAudio: "The timeline for AI implementation varies depending on the project's complexity, data availability, and specific requirements. A pilot project might take a few weeks to a couple of months, while full-scale enterprise solutions can take longer. We prioritize agile development for rapid iterations and value delivery.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="py-20 md:py-32 bg-gradient-to-b from-background to-slate-900/30">
      <div className="container max-w-3xl">
        <MotionDiv 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-headline text-4xl md:text-5xl mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our AI services and how Xoire can help your business.
          </p>
        </MotionDiv>

        <MotionDiv 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <FaqItemClient
                key={faq.value}
                value={faq.value}
                question={faq.question}
                answer={faq.answer}
                answerTextForAudio={faq.answerTextForAudio}
              />
            ))}
          </Accordion>
        </MotionDiv>
      </div>
    </section>
  );
}
