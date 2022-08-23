import { Link, Navigate } from "react-router-dom";
//IMPORTS BOOTSTRAP
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Favorites(props) {
  let token = sessionStorage.getItem("token");

  return (
    <div className="container">
      {!token && <Navigate to="/" />}
      <h2 className="pageTitle m-3">FAVORITES</h2>
      <Row xs={1} s={2} md={3} className="g-4">
        {!props.favorites.length && (
          <div
            className="col-12"
            style={{ minHeight: "60vh", color: "#ecf0f1" }}
          >
            <h3>You have nothing in favorites!</h3>
            <p style={{ fontWeight: "300" }}>
              Start watching movies and save them here.
            </p>
          </div>
        )}
        {props.favorites.map((oneMovie, idx) => {
          return (
            <Col key={idx}>
              <Card className="m-2">
                <img src={oneMovie.imgURL} variant="top" alt="movieScreen" />
                <button
                  className="favorite-btn"
                  onClick={props.addOrRemoveFromFavs}
                  data-movie-id={oneMovie.id}
                >
                  🤍​
                </button>
                <Card.Body>
                  <Card.Title>{oneMovie.title.substring(0, 20)}</Card.Title>
                  <Card.Text>{oneMovie.overview.substring(0, 100)}</Card.Text>
                  <Link
                    to={`/detail?movieID=${oneMovie.id}`}
                    className="btnCard"
                  >
                    VIEW DETAIL
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default Favorites;
