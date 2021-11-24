import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { SignupForm } from "components/forms/SignupForm";

export const SignupModalView = (): JSX.Element => {
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
        Signup
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignupForm onSuccess={handleClose} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="signup-form">
            Signup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
