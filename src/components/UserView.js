import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Row,
  Col,
} from "react-bootstrap";

const UserView = ({ handleLogout }) => {
  const [selectedCancer, setSelectedCancer] = useState(null);
  const [selectedGene, setSelectedGene] = useState(null);
  const [validCancers, setValidCancers] = useState([]);
  const [validGenes, setValidGenes] = useState([]);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchValidData = async () => {
      try {
        const cancerRes = await axios.get(
          "http://localhost:5000/api/cancer-details/valid-cancers"
        );
        const geneRes = await axios.get(
          "http://localhost:5000/api/ngs-test-results/genes"
        );
        setValidCancers(
          cancerRes.data.map((item) => ({ value: item, label: item }))
        );
        setValidGenes(
          geneRes.data.map((item) => ({ value: item, label: item }))
        );
      } catch (err) {
        console.error("Error al cargar datos válidos:", err);
        setError("Error al cargar opciones válidas.");
      }
    };

    fetchValidData();
  }, []);

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#2c2c2c",
      color: "#fff",
      borderColor: "#444",
      borderRadius: "8px",
      padding: "5px",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#1c1c1c",
      color: "#fff",
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? "#007bff" : isFocused ? "#333" : "#1c1c1c",
      color: "#fff",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#fff",
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !selectedCancer ||
      !validCancers.some((item) => item.value === selectedCancer.value)
    ) {
      setError("Por favor, selecciona un tipo de cáncer válido de la lista.");
      return;
    }

    if (
      !selectedGene ||
      !validGenes.some((item) => item.value === selectedGene.value)
    ) {
      setError("Por favor, selecciona un gen válido de la lista.");
      return;
    }

    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ngs-test-results/search",
        {
          cancer: selectedCancer.value,
          gene: selectedGene.value,
        }
      );
      setResults(response.data);
      console.log("Resultados de búsqueda:", response.data);
    } catch (error) {
      console.error("Error durante la búsqueda:", error);
      setError("No se encontraron resultados o hubo un error en el servidor.");
    }
  };

  const handleReset = () => {
    setSelectedCancer(null);
    setSelectedGene(null);
    setError("");
  };

  return (
    <Container
      fluid
      style={{
        backgroundColor: "#121212",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "800px",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          backgroundColor: "#1e1e1e",
        }}
      >
        <h1 className='text-center mb-4' style={{ color: "#007bff" }}>
          ONCO APP
        </h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className='mb-4'>
            <Form.Label column sm={3} style={{ color: "#b0b0b0" }}>
              Tipo de Cáncer:
            </Form.Label>
            <Col sm={9}>
              <Select
                styles={customStyles}
                options={validCancers}
                value={selectedCancer}
                onChange={setSelectedCancer}
                placeholder='Selecciona un tipo de cáncer'
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className='mb-4'>
            <Form.Label column sm={3} style={{ color: "#b0b0b0" }}>
              Gen:
            </Form.Label>
            <Col sm={9}>
              <Select
                styles={customStyles}
                options={validGenes}
                value={selectedGene}
                onChange={setSelectedGene}
                placeholder='Selecciona un gen afectado'
              />
            </Col>
          </Form.Group>

          {results && (
            <Card
              className='mt-4'
              style={{
                padding: "20px",
                borderRadius: "10px",
                backgroundColor: "#2c2c2c",
                color: "#fff",
              }}
            >
              <Card.Body>
                <Card.Title style={{ color: "#007bff" }}>
                  Resultados:
                </Card.Title>
                <ul>
                  {results.ngsResults.map((result, index) => (
                    <li key={index}>
                      <strong>Gen:</strong> {result.gene} <br />
                      <strong>Test:</strong> {result.testId}
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          )}

          <Row className='mt-4'>
            <Col sm={6}>
              <Button
                type='submit'
                style={{
                  width: "100%",
                  backgroundColor: "#007bff",
                  borderColor: "#007bff",
                  borderRadius: "8px",
                  padding: "10px",
                  fontWeight: "bold",
                }}
              >
                Buscar
              </Button>
            </Col>
            <Col sm={6}>
              <Button
                type='button'
                onClick={handleReset}
                style={{
                  width: "100%",
                  backgroundColor: "#6c757d",
                  borderColor: "#6c757d",
                  borderRadius: "8px",
                  padding: "10px",
                  fontWeight: "bold",
                }}
              >
                Reiniciar
              </Button>
            </Col>
          </Row>
        </Form>

        {error && (
          <Alert variant='danger' className='mt-4'>
            {error}
          </Alert>
        )}
        <div className='text-center mt-4'>
          <Button
            onClick={handleLogout}
            style={{
              backgroundColor: "#dc3545",
              borderColor: "#dc3545",
              borderRadius: "8px",
              padding: "10px",
              fontWeight: "bold",
            }}
          >
            Cerrar Sesión
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default UserView;
