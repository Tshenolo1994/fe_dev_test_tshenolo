// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface Profile {
  id: number,
  name: string;
  email: string;
  imageUrl: string;
}

const profiles: Profile[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fqodebrisbane.com%2Fwp-content%2Fuploads%2F2019%2F07%2FThis-is-not-a-person-2-1.jpeg&f=1&nofb=1&ipt=5739935821222fabd9668f054a9f7333971825cd57967785702d90f863015cd0&ipo=images'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'janesmith@gmail.com',
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rd.com%2Fwp-content%2Fuploads%2F2021%2F01%2FGettyImages-1199240976.jpg&f=1&nofb=1&ipt=5739935821222fabd9668f054a9f7333971825cd57967785702d90f863015cd0&ipo=images'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bobjohnson@gmail.com',
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rd.com%2Fwp-content%2Fuploads%2F2021%2F01%2FGettyImages-1199240976.jpg&f=1&nofb=1&ipt=5739935821222fabd9668f054a9f7333971825cd57967785702d90f863015cd0&ipo=images'
  },
  {
    id: 4,
    name: 'Alice Lee',
    email: 'alicelee@gmail.com',
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rd.com%2Fwp-content%2Fuploads%2F2021%2F01%2FGettyImages-1199240976.jpg&f=1&nofb=1&ipt=5739935821222fabd9668f054a9f7333971825cd57967785702d90f863015cd0&ipo=images'
  },
  {
    id: 5,
    name: 'David Kim',
    email: 'davidkim@gmail.com',
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rd.com%2Fwp-content%2Fuploads%2F2021%2F01%2FGettyImages-1199240976.jpg&f=1&nofb=1&ipt=5739935821222fabd9668f054a9f7333971825cd57967785702d90f863015cd0&ipo=images'
  },
  {
    id: 6,
    name: 'Emily Chen',
    email: 'emilychen@gmail.com',
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rd.com%2Fwp-content%2Fuploads%2F2021%2F01%2FGettyImages-1199240976.jpg&f=1&nofb=1&ipt=5739935821222fabd9668f054a9f7333971825cd57967785702d90f863015cd0&ipo=images'
  },
  {
    id: 7,
    name: 'Michael Brown',
    email: 'michaelbrown@gmail.com',
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rd.com%2Fwp-content%2Fuploads%2F2021%2F01%2FGettyImages-1199240976.jpg&f=1&nofb=1&ipt=5739935821222fabd9668f054a9f7333971825cd57967785702d90f863015cd0&ipo=images'
  },
  {
    id: 8,
    name: 'Olivia Davis',
    email: 'oliviadavis@gmail.com',
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rd.com%2Fwp-content%2Fuploads%2F2021%2F01%2FGettyImages-1199240976.jpg&f=1&nofb=1&ipt=5739935821222fabd9668f054a9f7333971825cd57967785702d90f863015cd0&ipo=images'
  },
  {
    id: 9,
    name: 'Sophia Wilson',
    email: 'sophiawilson@gmail.com',
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rd.com%2Fwp-content%2Fuploads%2F2021%2F01%2FGettyImages-1199240976.jpg&f=1&nofb=1&ipt=5739935821222fabd9668f054a9f7333971825cd57967785702d90f863015cd0&ipo=images'
  },
  {
    id: 10,
    name: 'William Taylor',
    email: 'williamtaylor@gmail.com',
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.rd.com%2Fwp-content%2Fuploads%2F2021%2F01%2FGettyImages-1199240976.jpg&f=1&nofb=1&ipt=5739935821222fabd9668f054a9f7333971825cd57967785702d90f863015cd0&ipo=images'
  }
];


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Profile | { message: string }>
) {
  const { id } = req.query;
  const profile = profiles.find(p => p.id === Number(id));
  if (!profile) {
    res.status(404).json({ message: 'Profile not found' });
  } else {
    res.status(200).json(profile);
  }
}