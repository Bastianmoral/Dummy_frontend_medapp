import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const SearchForm = ({
  cancer,
  genes,
  drug,
  testType,
  onCancerChange,
  onGeneChange,
  onDrugChange,
  onTestTypeChange,
  onSubmit,
  dummyData,
}) => (
  <Form onSubmit={onSubmit}>
    <Form.Group as={Row} className='mb-3'>
      <Form.Label column sm={2}>
        Tipo de cáncer:
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          type='text'
          value={cancer}
          onChange={onCancerChange}
          list='cancer-list'
        />
        <datalist id='cancer-list'>
          {dummyData.cancers.map((c, idx) => (
            <option key={idx} value={c} />
          ))}
        </datalist>
      </Col>
    </Form.Group>
    {/* Repetir estructura para Genes, Droga y Tipo de Test */}
    <Button type='submit'>Buscar</Button>
  </Form>
);

export default SearchForm;
