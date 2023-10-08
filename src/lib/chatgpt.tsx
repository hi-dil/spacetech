import OpenAI from "openai";

export async function generateTagsFromDescription(description: string) {
  let result = null;
  let error = null;

  const filter =
    'Can you extract the main keywords and extra information that you think appropriate from the given text into a tag with this format ["list of tags"] without an explanation. Also, if you can\'t extract the skills, give output as \'null\'.';

  const prompt = `${filter} Text: ${description}`;

  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API,
    dangerouslyAllowBrowser: true
  });


  try {
    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 1.3,
        max_tokens: 2000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,

      });

    result = completion.choices[0].message.content;
  } catch (err) {
    error = err;
  }

  return ({ result, error });
}
