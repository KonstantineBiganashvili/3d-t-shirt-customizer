import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt } = req.body;

  const config = new Configuration({
    apiKey: process.env.NEXT_APP_OPENAI_KEY,
  });

  const openai = new OpenAIApi(config);

  const response = await openai.createImage({
    prompt,
    n: 1,
    size: '1024x1024',
    response_format: 'b64_json',
  });

  const image = response?.data?.data[0]?.b64_json;

  if (image) {
    res.status(200).json({ photo: image });
  } else {
    res.status(500).json({ response: response.status });
  }
}
