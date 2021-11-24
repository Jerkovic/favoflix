import { Alert, Form } from "react-bootstrap";
import React, { useState } from "react";
import { auth } from "services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface SignupFormProps {
  onSuccess: () => void;
}

export const SignupForm = (props: SignupFormProps): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSignup = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      await createUserWithEmailAndPassword(auth, email, password);
      props.onSuccess();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <>
      {error && (
        <Alert key={"alert-login-error"} variant={"warning"}>
          {error}
        </Alert>
      )}
      <Form
        id={"signup-form"}
        noValidate
        autoComplete="off"
        onSubmit={handleSignup}
      >
        <fieldset disabled={false}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password again" />
          </Form.Group>
        </fieldset>
      </Form>
    </>
  );
};
