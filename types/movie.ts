export interface Movie {
  id: number;
  image: string;
  srcset: string;
  title: string;
  rating: number;
  date: string;
  link: string;
}

export enum SortType {
  'vote_average.desc' = 'rating descending',
  'vote_average.asc' = 'rating ascending',
  'popularity.desc' = 'popularity descending',
  'popularity.asc' = 'popularity ascending'
}
