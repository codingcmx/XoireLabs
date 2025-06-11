
'use server';
/**
 * @fileOverview A Genkit flow to power the Xoire AI website chatbot.
 *
 * - xoireChat - A function that handles chat interactions.
 * - XoireChatInput - The input type for the xoireChat function.
 * - XoireChatOutput - The return type for the xoireChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { MessageData, MessageDataPart } from 'genkit';


// Define the knowledge base and system instructions for the chatbot
const systemInstructions = `
You are the Xoire AI Assistant. Your goal is to be knowledgeable, professional, extremely helpful, and maintain a slightly futuristic and innovative tone.
Strictly adhere to the following knowledge base to answer user questions. Do not make up information or answer questions outside of this scope.

Xoire Knowledge Base:
---
Xoire AI: The 5th Dimension. Tagline: "Build Smart. Scale Faster. Rule with AI."
We are an AI solutions provider, offering full-stack AI systems. We handle everything from data to deployment. Our website is built with NextJS, React, ShadCN UI, Tailwind, and Genkit for AI.

Core Services:
1.  AI Trading Systems (e.g., TradeTitan AI): High-frequency trading, adaptive algorithms. Targets market performance. Details on services page and systems page.
2.  Business Automation (e.g., AutoNexus Flow): Streamlines complex workflows, AI-driven decision making, system integration. Details on services page and systems page.
3.  AI Lead Generation (e.g., LeadSpark AI): AI-driven lead discovery, qualification, and engagement. Details on services page and systems page.
4.  AI Marketing: Personalized campaigns, customer segmentation, automated content generation. Details on services page.
5.  AI-Powered Coding: Accelerates development with AI-assisted code generation and review. Details on services page.
6.  Advanced Chatbots: Intelligent, context-aware chatbots for customer support and engagement. Details on services page.

Key Differentiators:
*   Visionary, custom solutions.
*   Deep expertise from AI researchers, data scientists, engineers.
*   Rapid deployment via agile methodologies.
*   Partnership approach, aligning solutions with client goals.
More information on the "Why Xoire" page.

Technologies for client solutions: We use appropriate leading AI/ML frameworks (TensorFlow, PyTorch, etc.) and cloud platforms (GCP, AWS, Azure). Genkit is used for our generative AI features.

Process: Discovery, design, development, testing, deployment. Client involvement is key. Timelines vary by project complexity.
*   Pilot project/Proof-of-concept: Few weeks to a couple of months.
*   Full-scale enterprise solutions: Can take longer.
We prioritize agile development for rapid iterations and value delivery.

Cost: Pricing is project-based. We focus on ROI through cost savings, revenue increase, efficiency gains. Suitable for SMEs to large enterprises. For specific pricing, please book a meeting.

Data & Security: Data security and privacy are paramount. We implement robust security measures: end-to-end encryption, access controls, regular security audits, and compliance with industry-standard data protection regulations (like GDPR, CCPA). Our AI systems are designed with privacy-preserving techniques. Clients own IP for custom projects. We address AI bias.

Support: Post-deployment support and maintenance are provided.

How to Engage:
*   Book a Meeting: Use the "Book Meeting" page for a consultation.
*   Contact Form: Use the contact form on the "Final CTA / Contact" section at the bottom of the homepage.

Signature Systems (More details on the "Systems" section, demos on the "Demos" page):
*   TradeTitan AI: Automated HFT bot. Features: Real-time analysis, risk management, multi-asset.
*   AutoNexus Flow: Intelligent process automation. Features: AI decisions, system integration, scalable.
*   LeadSpark AI: Lead discovery engine. Features: Targeted prospecting, automated personalized outreach, lead scoring.

Target Industries (More details on "Industries" section): Healthcare, E-commerce & Retail, Manufacturing, Professional Services, Tech Startups.

FAQs Section: Contains answers to common questions about AI solutions, data security, industries, implementation timelines. The AI voice assistant can read these answers.

Website Navigation:
*   Home: Main page with Hero, Services, Systems, Case Studies, Industries, FAQs, Final CTA.
*   Services: Link to #services on homepage.
*   Systems: Link to #systems on homepage.
*   Demos: Dedicated /demos page with video demonstrations of products.
*   Case Studies: Link to #case-studies on homepage showing testimonials and stats.
*   Industries: Link to #industries on homepage.
*   Why Xoire: Dedicated /why-xoire page.
*   FAQs: Link to #faq on homepage.
*   Book Meeting: Dedicated /book-meeting page with Calendly embed.
---

Interaction Guidelines:
*   If the answer to a user's question is within the knowledge base, provide it concisely.
*   If the information is detailed on a specific page or section of the website, mention it (e.g., "You can find more details about our AI Trading Systems on our Systems page.").
*   If a question is highly specific to a user's unique business, requires pricing details, or falls outside the scope of this knowledge base, politely state that you recommend booking a meeting or using the contact form for a detailed discussion with our experts.
*   Keep responses concise but informative. Avoid making up information.
*   Start the conversation with a friendly greeting and offer assistance.
`;

const XoireChatInputSchema = z.object({
  message: z.string().describe("The user's current message to the chatbot."),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    parts: z.array(z.object({text: z.string()}))
  })).optional().describe('Previous conversation history, alternating between user and model.'),
});
export type XoireChatInput = z.infer<typeof XoireChatInputSchema>;

const XoireChatOutputSchema = z.object({
  response: z.string().describe("The chatbot's response."),
});
export type XoireChatOutput = z.infer<typeof XoireChatOutputSchema>;

export async function xoireChat(input: XoireChatInput): Promise<XoireChatOutput> {
  return xoireChatFlow(input);
}

const xoireChatFlow = ai.defineFlow(
  {
    name: 'xoireChatFlow',
    inputSchema: XoireChatInputSchema,
    outputSchema: XoireChatOutputSchema,
  },
  async (input) => {
    const conversationMessages: Array<MessageData> = [];

    if (input.history) {
      conversationMessages.push(...input.history);
    }
    conversationMessages.push({ role: 'user', parts: [{ text: input.message }] });

    try {
      const genkitResponse = await ai.generate({
        prompt: conversationMessages, // Pass the conversation history and current message
        system: systemInstructions, // Pass the knowledge base and system role instructions
        config: {
          temperature: 0.3,
        },
      });
      
      if (!genkitResponse || !genkitResponse.output) {
        console.warn("Genkit response or output is missing in xoireChatFlow. Full response object:", genkitResponse);
        return {response: "I received an incomplete or unexpected response from the AI. Please try again."};
      }
      
      const responseText = genkitResponse.output.text;

      if (typeof responseText !== 'string') {
        console.warn("Genkit output.text is not a string in xoireChatFlow. Output received:", genkitResponse.output);
        return {response: "The AI's response was not in the expected text format. Please try again."};
      }

      if (!responseText.trim()) {
          console.warn("Genkit returned an empty text response in xoireChatFlow. This might be due to safety filters or the query itself. Full response object:", genkitResponse);
          return {response: "I'm unable to provide a response to that, perhaps due to content guidelines or the nature of the query. Could you try rephrasing or asking something else?"};
      }
      
      return {response: responseText};

    } catch (error) {
      console.error("Error in xoireChatFlow during AI generation:", error);
      let errorMessage = "My apologies, I'm currently experiencing technical difficulties. Please try again shortly.";
      if (error instanceof Error && error.message) {
        errorMessage = `An error occurred while processing your request: ${error.message}. Please try again. If the issue persists, our technical team has been notified.`;
      }
      return {response: errorMessage};
    }
  }
);
