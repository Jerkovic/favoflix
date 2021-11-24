import {
  ButtonGroup,
  ButtonToolbar,
  Container,
  Nav,
  Navbar,
  NavItem,
} from "react-bootstrap";
import React, { useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Autocomplete } from "components/search/Autocomplete";
import { LoginModalView } from "components/views/LoginModalView";
import { SignupModalView } from "components/views/SignupModalView";
import { UserContext } from "App";
import { LogoutButton } from "components/forms/LogoutButton";

export interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps): JSX.Element => {
  const userContext = useContext(UserContext);

  return (
    <>
      <Navbar
        expand="lg"
        variant="dark"
        bg="dark"
        className={"fixed-top shadow-sm"}
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>FavoFlix</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/suggest">
                <Nav.Link>Suggest</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/upload">
                <Nav.Link>Upload</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <NavItem className={"m-auto"}>
                <Autocomplete
                  openOnFocus={true}
                  placeholder={"Search movies"}
                />
              </NavItem>
              <NavItem className={"ms-3"}>
                {userContext.user ? (
                  <LogoutButton label={"Logout"} />
                ) : (
                  <ButtonToolbar aria-label="user actions">
                    <ButtonGroup className="me-2" aria-label="login">
                      <LoginModalView />
                    </ButtonGroup>
                    <ButtonGroup className="me-2" aria-label="signup">
                      <SignupModalView />
                    </ButtonGroup>
                  </ButtonToolbar>
                )}
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className={"mt-4 pt-5"}>{children}</Container>
    </>
  );
};
