import React, { useState, useContext } from "react";
import AdminView from "./components/AdminView";
import SellerView from "./components/SellerView";
import UserView from "./components/UserView";
import Login from "./components/Login";
import { AuthContext } from "./context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container } from "react-bootstrap";

function App() {
  const { role, logout } = useContext(AuthContext);
  /*   const [cancer, setCancer] = useState("");
  const [genes, setGenes] = useState([]);
  const [drug, setDrug] = useState("");
  const [results, setResults] = useState(null);
  const [testType, setTestType] = useState("");
 */
  /*   const dummyData = {
    cancers: ["Cancer de pulmón", "Cancer de mama"],
    genes: ["APC", "BRCA1", "BRCA2", "CDH1", "CHEK2", "FANCC", "P53", "RCA2"],
    drugs: ["Droga A", "Droga B", "Droga C"],
    tests: [
      { code: "test_bc01", genes: ["P53"], Zygocity: "Somatica" },
      { code: "test_bc02", genes: ["BRCA1"], Zygocity: "Germinal" },
    ],
    availability: [{ drug: "Droga A", available: true }],
    cancerGeneDrug: [
      { cancer: "Cancer de pulmón", genes: ["BRCA1"], drug: "Droga A" },
      { cancer: "Cancer de mama", genes: ["BRCA2"], drug: "Droga B" },
    ],
  };
 */
  return (
    <Router>
      <Container
        fluid
        className='p-5'
        style={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}
      >
        <Routes>
          <Route
            path='/'
            element={!role ? <Login /> : <Navigate to={`/${role}`} />}
          />
          <Route
            path='/admin'
            element={
              role === "admin" ? (
                <AdminView handleLogout={logout} />
              ) : (
                <Navigate to='/' />
              )
            }
          />
          <Route
            path='/seller'
            element={
              role === "seller" ? (
                <SellerView handleLogout={logout} />
              ) : (
                <Navigate to='/' />
              )
            }
          />
          <Route
            path='/user'
            element={
              role === "user" ? (
                <UserView handleLogout={logout} />
              ) : (
                <Navigate to='/' />
              )
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

/* import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import CancerDetails from "./components/CancerDetails";

function App() {
  const [cancer, setCancer] = useState("");
  const [genes, setGenes] = useState([]);
  const [drug, setDrug] = useState("");
  const [results, setResults] = useState(null);
  const [testType, setTestType] = useState("");

  const dummyData = {
    cancers: ["Cancer de pulmón", "Cancer de mama"],
    genes: ["APC", "BRCA1", "BRCA2", "CDH1", "CHEK2", "FANCC", "P53", "RCA2"],
    drugs: ["Droga A", "Droga B", "Droga C"],
    tests: [
      {
        code: "test_bc01",
        genes: ["P53", "BRCA1", "BRCA2", "CDH1", "CHEK2", "FANCC"],
        Zygocity: "Somatica",
      },
      { code: "test_bc02", genes: ["BRCA1", "BRCA2"], Zygocity: "Germinal" },
      {
        code: "test_gc",
        genes: ["CDH1", "APC", "P53"],
        Zygocity: "Somatica",
      },
    ],
    availability: [
      { drug: "Droga A", available: true },
      { drug: "Droga B", available: false },
    ],
    cancerGeneDrug: [
      {
        cancer: "Cancer de pulmón",
        genes: ["BRCA1"],
        drug: "Droga A",
        tests: ["test_bc01"],
      },
      {
        cancer: "Cancer de mama",
        genes: ["BRCA2"],
        drug: "Droga B",
        tests: ["test_bc02", "test_gc"],
      },
    ],
  };

  const handleGeneChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setGenes(value);
  };

  const handleTestTypeChange = (e) => {
    setTestType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cancer || genes.length === 0) {
      alert(
        "Por favor, selecciona al menos un tipo de cáncer y uno o más genes."
      );
      return;
    }

    const filteredData = dummyData.cancerGeneDrug.filter(
      (item) =>
        item.cancer.toLowerCase() === cancer.toLowerCase() &&
        genes.every((gene) => item.genes.includes(gene)) &&
        (!drug || item.drug.toLowerCase() === drug.toLowerCase())
    );

    const result = {
      filteredData,
      tests: filteredData.flatMap((item) =>
        dummyData.tests.filter(
          (test) =>
            item.tests.includes(test.code) &&
            (!testType || test.Zygocity === testType)
        )
      ),
      availability: filteredData.map((item) =>
        dummyData.availability.find((avail) => avail.drug === item.drug)
      ),
    };

    setResults(result);
  };

  return (
    <Container
      fluid
      className='p-5'
      style={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "100vh", // Cambiar Height a minHeight
        width: "100%", // Cambiar width a 100%
      }}
    >
      <h1>ONCO APP</h1>
      <Card style={{ backgroundColor: "#333", color: "#fff" }}>
        <Card.Body>
          <Card.Title className='mb-3'>
            Variables a ingresar dentro de la APP
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm={2}>
                Tipos de cancer:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='text'
                  value={cancer}
                  onChange={(e) => setCancer(e.target.value)}
                  list='cancer-list'
                  style={{ backgroundColor: "#444", color: "#fff" }}
                />
                <datalist id='cancer-list'>
                  {dummyData.cancers.map((c, index) => (
                    <option key={index} value={c} />
                  ))}
                </datalist>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm={2}>
                Genes:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as='select'
                  multiple
                  value={genes}
                  onChange={handleGeneChange}
                  style={{ backgroundColor: "#444", color: "#fff" }}
                >
                  {dummyData.genes.map((g, index) => (
                    <option key={index} value={g}>
                      {g}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm={2}>
                Drogas (Opcional):
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='text'
                  value={drug}
                  onChange={(e) => setDrug(e.target.value)}
                  list='drug-list'
                  style={{ backgroundColor: "#444", color: "#fff" }}
                />
                <datalist id='drug-list'>
                  {dummyData.drugs.map((d, index) => (
                    <option key={index} value={d} />
                  ))}
                </datalist>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm={2}>
                Tipo de test:
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type='radio'
                  label='Germinal'
                  name='testType'
                  value='Germinal'
                  checked={testType === "Germinal"}
                  onChange={handleTestTypeChange}
                  style={{ color: "#fff" }}
                />
                <Form.Check
                  type='radio'
                  label='Somatico'
                  name='testType'
                  value='Somatica'
                  checked={testType === "Somatica"}
                  onChange={handleTestTypeChange}
                  style={{ color: "#fff" }}
                />
                <Form.Check
                  type='radio'
                  label='Ambos'
                  name='testType'
                  value=''
                  checked={testType === ""}
                  onChange={handleTestTypeChange}
                  style={{ color: "#fff" }}
                />
              </Col>
            </Form.Group>
            <Button variant='primary' type='submit'>
              Buscar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {results && results.filteredData.length === 0 && (
        <>
          <Card
            className='mt-4'
            style={{ backgroundColor: "#ff0000", color: "#fff" }}
          >
            <Card.Body>
              <Card.Title>Sin resultados</Card.Title>
              <p>
                No hay coincidencias para las variables de búsqueda
                proporcionadas.
              </p>
            </Card.Body>
          </Card>
          <CancerDetails />
        </>
      )}
      {results && results.filteredData.length > 0 && (
        <Card
          className='mt-4'
          style={{ backgroundColor: "#333", color: "#fff" }}
        >
          <Card.Body>
            <Card.Title>Resultados:</Card.Title>
            <div>
              <h5>Relación entre variables (Gen y cancer):</h5>
              <ul>
                {results.filteredData.map((item, index) => (
                  <li key={index}>
                    Cancer: {item.cancer}, Gen: {item.genes.join(", ")}, Droga:{" "}
                    {item.drug}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5>Tests:</h5>
              <ul>
                {results.tests.map((test, index) => (
                  <li key={index}>
                    Código del tes: {test.code}, Genes: {test.genes.join(", ")},
                    Tipo: {test.Zygocity}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5>Disponibilidad de la droga en el ISP:</h5>
              <ul>
                {results.availability.map((avail, index) => (
                  <li key={index}>
                    Droga: {avail.drug}, Disponible en Chile:{" "}
                    {avail.available ? "Sí" : "No"}
                  </li>
                ))}
              </ul>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default App;  */
