import React, { useCallback, MouseEvent } from 'react'
import { Card } from 'react-bootstrap'
import { Movie } from 'types/movie'

interface MovieItemProps {
  item: Movie;
  active: boolean;
  onSelect: (id: number) => void;
}
export const MovieItem: React.FC<MovieItemProps> = (props) => {

  const { item, onSelect, active } = props
  const wrapperClass = active ? 'movie-item active' : 'movie-item'
  const iconClass = active ? 'fas fa-star active' : 'far fa-star'

  const handleSelect = useCallback((e: MouseEvent<HTMLElement>, id: number) => {
    e.stopPropagation()
    e.preventDefault()
    onSelect(id)
  }, [onSelect])

  return (
    <a target='_blank' href={item.link}>
      <Card className={wrapperClass}>
        <Card.Img variant='top' src={item.image} srcSet={item.srcset} loading='lazy' />
        <Card.Body>
          <Card.Title className='title'>{item.title}</Card.Title>
          <Card.Text className='date'>
            {item.date}
          </Card.Text>
        </Card.Body>
        <div className='star'>
          <i className={iconClass} onClick={(e) => handleSelect(e, item.id)} />
          &nbsp;{item.rating}
        </div>

      </Card>
    </a>
  )
}
