import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import classes from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logo } from "../../assets/helper/imagePath";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/reducers/authSlice.js";
<style>
  {`
        .bg-body-tertiary{
            background-color:var(--primary-color) !important;
            }
        `}
</style>;
function Header() {
  const { isLogin } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(logoutUser());
    navigate("/");
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbarContainer">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} className={classes.logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="d-flex justify-content-between"
        >
          <Nav className="me-auto">
            <Nav.Link as={NavLink} className={classes.headingTags} to="/posts">
              Posts
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              className={classes.headingTags}
              to="/create-post"
            >
              Create Post
            </Nav.Link>
          </Nav>
          <Nav>
            {!isLogin ? (
              <>
                <Nav.Link
                  as={NavLink}
                  className={classes.headingTags}
                  to="/login"
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  className={classes.headingTags}
                  to="/register"
                >
                  Register
                </Nav.Link>
              </>
            ) : (
              <Nav.Link
                as={NavLink}
                className={classes.headingTags}
                onClick={logout}
                to="/"
              >
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
