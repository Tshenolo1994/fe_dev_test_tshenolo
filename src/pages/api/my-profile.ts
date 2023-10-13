// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface Profile {
  id: number,
  name: string;
  email: string;
  imageUrl: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Profile>
) {
  res.status(200).json({
    id: 1,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fqodebrisbane.com%2Fwp-content%2Fuploads%2F2019%2F07%2FThis-is-not-a-person-2-1.jpeg&f=1&nofb=1&ipt=5739935821222fabd9668f054a9f7333971825cd57967785702d90f863015cd0&ipo=images'
  });
}