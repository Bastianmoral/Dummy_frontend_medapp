import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

function App() {
  const [cancer, setCancer] = useState("");
  const [genes, setGenes] = useState([]);
  const [drug, setDrug] = useState("");
  const [results, setResults] = useState(null);
  const [testType, setTestType] = useState("");

  const dummyData = {
    cancers: ["Cancer de pulmón", "Cancer de mama"],
    genes: ["P53", "BRCA1", "BRCA2", "RCA2", "CDH1", "CHEK2", "FANCC", "APC"],
    drugs: ["Drogita A", "Drogita B", "Drogita C"],
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
      { drug: "Drogita A", available: true },
      { drug: "Drogita B", available: false },
    ],
    cancerGeneDrug: [
      {
        cancer: "Cancer de pulmón",
        gene: "BRCA1",
        drug: "Drogita A",
        tests: ["test_bc01"],
      },
      {
        cancer: "Cancer de mama",
        gene: "BRCA2",
        drug: "Drogita B",
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
    const filteredData = dummyData.cancerGeneDrug.filter(
      (item) =>
        item.cancer === cancer &&
        genes.every((gene) => item.gene.includes(gene)) &&
        (!drug || item.drug === drug)
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
    <Container className='mt-5'>
      <Card>
        <Card.Body>
          <Card.Title className='mb-4'>Cancer Data Search</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column sm={2}>
                Cancer Type:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='text'
                  value={cancer}
                  onChange={(e) => setCancer(e.target.value)}
                  list='cancer-list'
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
                Drug (optional):
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='text'
                  value={drug}
                  onChange={(e) => setDrug(e.target.value)}
                  list='drug-list'
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
                Test Type:
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type='radio'
                  label='Germinal'
                  name='testType'
                  value='Germinal'
                  checked={testType === "Germinal"}
                  onChange={handleTestTypeChange}
                />
                <Form.Check
                  type='radio'
                  label='Somatica'
                  name='testType'
                  value='Somatica'
                  checked={testType === "Somatica"}
                  onChange={handleTestTypeChange}
                />
                <Form.Check
                  type='radio'
                  label='All'
                  name='testType'
                  value=''
                  checked={testType === ""}
                  onChange={handleTestTypeChange}
                />
              </Col>
            </Form.Group>
            <Button variant='primary' type='submit'>
              Search
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {results && (
        <Card className='mt-4'>
          <Card.Body>
            <Card.Title>Results:</Card.Title>
            <div>
              <h5>Cancer and Gene Matches:</h5>
              <ul>
                {results.filteredData.map((item, index) => (
                  <li key={index}>
                    Cancer: {item.cancer}, Gene: {item.gene}, Drug: {item.drug}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5>Tests:</h5>
              <ul>
                {results.tests.map((test, index) => (
                  <li key={index}>
                    Test Code: {test.code}, Genes: {test.genes.join(", ")},
                    Type: {test.Zygocity}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5>Drug Availability:</h5>
              <ul>
                {results.availability.map((avail, index) => (
                  <li key={index}>
                    Drug: {avail.drug}, Available:{" "}
                    {avail.available ? "Yes" : "No"}
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

export default App;
