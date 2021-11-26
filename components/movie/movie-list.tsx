import React, { useCallback, useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { MovieItem } from './movie'
import { Movie } from 'types/movie'
import { save, load } from 'helpers/storage'

interface MovieListProps {
  data: Movie[];
}
export const MovieList: React.FC<MovieListProps> = (props) => {

  const { data } = props
  const [selected, setSelected] = useState<number[]>([])

  useEffect(() => {
    setSelected(load())
  }, [])

  const handleSelect = useCallback((id: number) => {
    setSelected(sels => {
      const olds = sels.slice()
      const idx = olds.indexOf(id)
      if (idx >= 0) {
        olds.splice(idx, 1)
      } else {
        olds.push(id)
      }

      save(olds)
      return [...olds]
    })
  }, [])

  return (
    <Row>
      {data.map(item => (
        <Col className='col' key={item.id} style={{ marginTop: 16 }}>
          <MovieItem item={item} onSelect={handleSelect} active={selected.includes(item.id)} />
        </Col>
      ))}
    </Row>
  )
}
