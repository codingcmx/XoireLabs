'use server';

/**
 * @fileOverview AI voice assistant to read FAQ answers.
 *
 * - aiVoiceAssistant - A function that generates speech from text.
 * - AiVoiceAssistantInput - The input type for the aiVoiceAssistant function.
 * - AiVoiceAssistantOutput - The return type for the aiVoiceAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiVoiceAssistantInputSchema = z.object({
  text: z.string().describe('The text to be converted to speech.'),
});
export type AiVoiceAssistantInput = z.infer<typeof AiVoiceAssistantInputSchema>;

const AiVoiceAssistantOutputSchema = z.object({
  audioUrl: z.string().describe('The data URI of the generated audio.'),
});
export type AiVoiceAssistantOutput = z.infer<typeof AiVoiceAssistantOutputSchema>;

export async function aiVoiceAssistant(input: AiVoiceAssistantInput): Promise<AiVoiceAssistantOutput> {
  return aiVoiceAssistantFlow(input);
}

const aiVoiceAssistantPrompt = ai.definePrompt({
  name: 'aiVoiceAssistantPrompt',
  input: {schema: AiVoiceAssistantInputSchema},
  output: {schema: AiVoiceAssistantOutputSchema},
  prompt: `You are an AI voice assistant that converts text to speech.

  Convert the following text to speech and return the data URI of the audio.

  Text: {{{text}}}`, // No media type here
});

const aiVoiceAssistantFlow = ai.defineFlow(
  {
    name: 'aiVoiceAssistantFlow',
    inputSchema: AiVoiceAssistantInputSchema,
    outputSchema: AiVoiceAssistantOutputSchema,
  },
  async input => {
    // Gemini 2.0 Flash can not generate audio, therefore this is just a mock function.
    // In the future, we could use a different model, but not right now.
    const audioUrl = 'data:audio/mpeg;base64,SUQzAAAA';
    return {audioUrl};
    // const {output} = await aiVoiceAssistantPrompt(input);
    // return output!;
  }
);
