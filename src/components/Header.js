import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import alkemyLogo from "../alkemyLogo.png";
import logout from "../logout.png";

//IMPORTS NAVBAR

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";

function Header(props) {
  let token = sessionStorage.getItem("token");
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== null) {
      setIsLogged(true);
    }
  }, [token]);

  const logOut = () => {
    setIsLogged(!isLogged);
    navigate("/");
    sessionStorage.clear();
  };

  return (
    <>
      <Navbar expand="lg" className="header" fixed="top">
        <Container>
          <Navbar.Brand href="/">
            <img src={alkemyLogo} alt="imgLogo" width="30px" />
          </Navbar.Brand>
          {isLogged ? (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/list">Movies</Nav.Link>
                  <Nav.Link href="/favorites">
                    Favorites{" "}
                    <Badge bg="danger">
                      {props.favorites.length > 0 && props.favorites.length}
                    </Badge>{" "}
                  </Nav.Link>
                </Nav>
                <SearchBar />
                <span className="btnLogOut" onClick={logOut}>
                  Log Out <img src={logout} width="13px" alt="logoutBtn" />
                </span>
              </Navbar.Collapse>
            </>
          ) : (
            ""
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
