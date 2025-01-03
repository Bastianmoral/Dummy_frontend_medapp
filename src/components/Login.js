import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Form, Button, Card } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        { username, password }
      );
      login(response.data.token);
    } catch (error) {
      alert("Credenciales incorrectas");
      console.error("Error en el login:", error);
    }
  };

  return (
    <Card className='p-4 bg-dark text-light'>
      <Card.Title className='text-center'>Iniciar Sesión</Card.Title>
      <Form onSubmit={handleLogin}>
        <Form.Group className='mb-3'>
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type='text'
            placeholder='Usuario'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type='password'
            placeholder='Contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className='text-center'>
          <Button variant='primary' type='submit'>
            Iniciar Sesión
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default Login;
