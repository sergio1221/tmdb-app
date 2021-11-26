import { BASE_URL, IMGAG_BASE, IMGAG_BASE2X, LINK_BASE, authGet } from './base'
import { Movie } from 'types/movie'

interface MovieItem {
  adult: boolean,
  backdrop_path: string | null,
  genre_ids: number[],
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: false,
  vote_average: 10,
  vote_count: 1
}

interface MovieListResponse {
  page: number;
  total_pages: 500;
  total_results: 10000;
  results: MovieItem[];
}
export async function getMovies(page: number, sort: string): Promise<Movie[]> {
  const data: MovieListResponse = await authGet(`${BASE_URL}/discover/movie`, {
    page: `${page}`, sort_by: sort
  })

  console.log(data)
  return data.results.map(item => ({
    id: item.id,
    title: item.title,
    image: `${IMGAG_BASE}${item.poster_path}`,
    srcset: `${IMGAG_BASE}${item.poster_path} 1x, ${IMGAG_BASE2X}${item.poster_path} 2x`,
    rating: item.vote_average,
    date: item.release_date,
    link: `${LINK_BASE}/${item.id}`
  }))
}