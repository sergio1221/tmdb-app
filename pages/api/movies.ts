// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getMovies } from 'service/tmdb'
import { Movie } from 'types/movie'

type Data = {
  movies: Movie[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const { page, sort } = req.query

  const pageNo = page ? parseInt(page as string) : 1
  const movies = await getMovies(pageNo, sort as string)
  res.status(200).json({ movies })
}
