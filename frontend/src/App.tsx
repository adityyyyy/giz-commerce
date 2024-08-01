import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Button, Badge } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Store } from "./store";
import "react-toastify/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  const {
    state: { mode, cart },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const switchModeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };

  return (
    <>
      <div className="d-flex flex-column vh-100">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar className="border-bottom border-dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>giz commerce</Navbar.Brand>
              </LinkContainer>
            </Container>
            <Nav>
              <Button variant={mode} onClick={switchModeHandler}>
                <i
                  className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}
                ></i>
              </Button>
              <Link to="/cart" className="nav-link">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
              <a href="/signin" className="nav-link">
                SignUp
              </a>
            </Nav>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Outlet />
          </Container>
        </main>
        <footer className="center">All rights reserved</footer>
      </div>
    </>
  );
}

export default App;
