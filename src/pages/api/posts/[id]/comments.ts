// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface Comment {
  profileId: number;
  postId: number;
  text: string;
}

let comments: Comment[] = [
  { postId: 1, text: 'Comment 1 for post 1', profileId: 1 },
  { postId: 1, text: 'Comment 2 for post 1', profileId: 2 },
  { postId: 1, text: 'Comment 3 for post 1', profileId: 3 },
  { postId: 2, text: 'Comment 1 for post 2', profileId: 4 },
  { postId: 2, text: 'Comment 2 for post 2', profileId: 5 },
  { postId: 3, text: 'Comment 1 for post 3', profileId: 6 },
  { postId: 3, text: 'Comment 2 for post 3', profileId: 7 },
  { postId: 3, text: 'Comment 3 for post 3', profileId: 8 },
  { postId: 4, text: 'Comment 1 for post 4', profileId: 9 },
  { postId: 4, text: 'Comment 2 for post 4', profileId: 10 }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Comment[] | Comment>
) {
  if (req.method === 'POST') {
    const { text, profileId } = req.body;
    const postId = parseInt(req.query.id as string);
    const newComment = { postId, text, profileId };
    comments.push(newComment);
    res.status(200).json(newComment);
  }
  res.status(200).json(comments.filter(comment => comment.postId === Number(req.query.id)));

}