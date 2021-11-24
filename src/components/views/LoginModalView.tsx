import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { LoginForm } from "components/forms/LoginForm";

export const LoginModalView = (): JSX.Element => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    return () => {
      console.log("unsub");
    };
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Login
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm onSuccess={handleClose} />
          <div>Don't have an account? register now.</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="login-form">
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
