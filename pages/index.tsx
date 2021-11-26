import React, { useState, useCallback } from 'react'
import type { NextPage } from 'next'
import { Spinner, Form, Button } from 'react-bootstrap'

import { Page, PageTitle } from 'components/base'
import { MovieList } from 'components/movie/movie-list'
import { useLoad } from 'hooks/use-load'
import { Movie, SortType } from 'types/movie'
import { discoverMovies } from 'service/client/discover'
import { LOAD_MOVIES_STEP, PAGE_COUNT } from 'helpers/constants'

const Home: NextPage = () => {

  const [step, setStep] = useState(0)
  const [sorting, setSorting] = useState<keyof typeof SortType>('vote_average.desc')

  const { data, error, busy } = useLoad<Movie>(step, sorting, discoverMovies)

  const handleLoad = useCallback(() => {
    setStep(step => Math.min(step + 1, LOAD_MOVIES_STEP.length - 1))
  }, [])

  return (
    <Page title='TMDB-List' className='movie-list-page relative'>
      <PageTitle value='Movie List' />

      <section className='sort-bar'>
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
      </section>

      {busy && <Spinner variant='primary' animation='border' className='absolute-center' />}
      {error && <div className='text-center error'>{error}</div>}

      <section className='movie-list'>
        <MovieList data={data} />
      </section>

      <section className='actions'>
        <Button variant='primary' onClick={handleLoad} className='w-100'>Load More Data</Button>
      </section>
    </Page>
  )
}

export default Home
