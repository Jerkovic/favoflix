import { useMovies } from "services/firebase";
import { Alert, Col, Row } from "react-bootstrap";
import { MovieCard } from "components/cards/MovieCard";
import React from "react";

export const HomeView = (): JSX.Element => {
  const { movies, error } = useMovies();

  return (
    <>
      <h1>Welcome!</h1>
      {error && (
        <Alert key={"alert-login-error"} variant={"danger"}>
          {error}
        </Alert>
      )}
      <Row className="mx-0" xs={1} md={3} lg={4}>
        {movies.map((movie) => (
          <Col key={movie.id} className={"mb-4"}>
            <MovieCard key={movie.id} movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  );
};
