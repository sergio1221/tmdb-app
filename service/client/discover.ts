import { Movie } from 'types/movie'
import { get, BASE_URL } from './base'

export async function discoverMovies(page: number, sort: string): Promise<Movie[]> {
  return await get(`${BASE_URL}/movies`, { page: `${page}`, sort })
}
