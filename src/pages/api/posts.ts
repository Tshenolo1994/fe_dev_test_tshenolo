// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { log } from "console";
import type { NextApiRequest, NextApiResponse } from 'next'

interface Post {
  id: number,
  title: string;
  body: string;
}

let posts: Post[] = [
  {
    id: 1,
    title: 'My First Post',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna vel bibendum bibendum, nisl velit bibendum sapien, vel bibendum sapien elit vel nunc. Sed euismod, urna vel bibendum bibendum, nisl velit bibendum sapien, vel bibendum sapien elit vel nunc.'
  },
  {
    id: 2,
    title: 'My Second Post',
    body: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed euismod, urna vel bibendum bibendum, nisl velit bibendum sapien, vel bibendum sapien elit vel nunc. Sed euismod, urna vel bibendum bibendum, nisl velit bibendum sapien, vel bibendum sapien elit vel nunc.'
  },
  {
    id: 3,
    title: 'My Third Post',
    body: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed euismod, urna vel bibendum bibendum, nisl velit bibendum sapien, vel bibendum sapien elit vel nunc. Sed euismod, urna vel bibendum bibendum, nisl velit bibendum sapien, vel bibendum sapien elit vel nunc.'
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[] | Post>
) {
  if (req.method === 'POST') {
    const { title, body } = req.body;
    const lastId = posts[posts.length - 1].id;
    const newPost = { title, body, id: lastId + 1 };
    posts.push(newPost);
    res.status(201).json(newPost);
  }

  res.status(200).json(posts);
}