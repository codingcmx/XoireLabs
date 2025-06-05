
'use server';
/**
 * @fileOverview A Genkit flow to generate images based on a text prompt.
 *
 * - generateImage - A function that handles the image generation process.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  promptText: z.string().describe('The text prompt for image generation.'),
  originalPlaceholderUrl: z.string().url().describe('The original placeholder image URL to fallback to if generation fails.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageDataUri: z.string().describe('The data URI of the generated image, or the original placeholder if generation failed.'),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return definedGenerateImageFlow(input);
}

const definedGenerateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    try {
      const enhancedPrompt = `A professional, high-resolution, visually striking image of a ${input.promptText}. Theme: futuristic AI technology. Style: sleek, modern, digital.`;
      const {media} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp', // IMPORTANT: Specific model for image generation
        prompt: enhancedPrompt,
        config: {
          responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE
        },
      });

      if (media && media.url) {
        return { imageDataUri: media.url };
      }
      console.warn(`Image generation for prompt "${input.promptText}" did not return a valid media object or URL. Falling back to placeholder.`);
      return { imageDataUri: input.originalPlaceholderUrl };
    } catch (error) {
      console.error(`Error generating image for prompt "${input.promptText}":`, error);
      return { imageDataUri: input.originalPlaceholderUrl };
    }
  }
);
