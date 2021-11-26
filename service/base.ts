export const API_KEY = '5c03f016d370ff683c09e41cb63eb549'
export const BASE_URL = 'https://api.themoviedb.org/3'
export const IMGAG_BASE = 'https://image.tmdb.org/t/p/w220_and_h330_face'
export const IMGAG_BASE2X = 'https://image.tmdb.org/t/p/w440_and_h660_face'
export const LINK_BASE = 'https://www.themoviedb.org/movie'

export const authGet = (base: string, params: { [key: string]: string }) => {
  const url = new URL(base)
  Object.keys(params).forEach((key: string) => {
    url.searchParams.append(key, params[key])
  })

  url.searchParams.append('api_key', API_KEY)
  return fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }).then(res => res.json());
}
