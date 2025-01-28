export type Movie = {
  image: string;
  title: string;
  releaseDate: string;
  director: string;
  rating: string;
  synopsis: string;
  genres: string[];
  cast: { character: string; actorName: string; actorImage: string }[];
};
