import type { NextApiRequest, NextApiResponse } from 'next'
import { Post, posts } from "../posts";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post | undefined>
) {
  let post = posts.find(post => post.id === Number(req.query.id))
  res.status(200).json(post);
}