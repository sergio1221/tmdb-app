const create_url = (base: string, params: { [key: string]: string }): string => {
  const url = new URL(base)
  Object.keys(params).forEach((key: string) => {
    url.searchParams.append(key, params[key])
  })

  return url.toString()
}


export const BASE_URL = 'http://localhost:3000/api'

export function get(base: string, params: { [key: string]: string } = {}) {
  return fetch(create_url(base, params), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }).then(res => res.json().then(data => {
    if (res.ok) return data;
    else throw data.reason;
  }))
}