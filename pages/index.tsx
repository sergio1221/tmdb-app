import React, { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { Spinner, Form } from 'react-bootstrap'

import { Page, PageTitle } from 'components/base'
import { MovieList } from 'components/movie/movie-list'
import { Movie, SortType } from 'types/movie'
import { discoverMovies } from 'service/client/discover'

const Home: NextPage = () => {

  const [page, setPage] = useState(1)
  const [sorting, setSorting] = useState<keyof typeof SortType>('vote_average.desc')
  const [movies, setMovies] = useState<Movie[]>([])

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchFn = async () => {
      try {
        setError('')
        setBusy(true)
        const { movies } = await discoverMovies(page, sorting)
        console.log(movies)
        setMovies(movies)
      } catch (e: any) {
        setError(e.response)
      } finally {
        setBusy(false)
      }
    }

    fetchFn()
  }, [page, sorting])

  return (
    <Page title='TMDB-List' className='movie-list-page relative'>
      <PageTitle value='Movie List' />

      <Form.Group className='sort-bar'>
        <Form.Label className='m-0'>Sort: </Form.Label>
        <Form.Select
          aria-label='sort'
          value={sorting}
          className='w-auto'
          onChange={v => setSorting(v.target.value as keyof typeof SortType)}
        >
          {Object.keys(SortType).map(key => (
            <option key={key} value={key}>
              {SortType[key as keyof typeof SortType]}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      {busy && <Spinner variant='primary' animation='border' className='absolute-center' />}
      {error && <div className='text-center error'>{error}</div>}

      <MovieList data={movies} />
    </Page>
  )
}

export default Home
