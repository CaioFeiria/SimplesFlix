import { Movie } from '../models/movie.model';
import { Cast } from './cast';

export type LoadMovie = {
  id: number;
  imgMovie: string;
  releaseDate: string;
  sinopse: string;
  director: string;
  rating: string;
  genres: string[];
  title: string;
  castDetails: Cast[];
  movie: Movie;
};
