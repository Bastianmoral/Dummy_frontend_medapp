import React from "react";
import { Card } from "react-bootstrap";
import Availability from "./Availability";
import TestDetails from "./TestDetails";

const Results = ({ results }) => (
  <Card className='mt-4'>
    <Card.Body>
      <Card.Title>Resultados:</Card.Title>
      <ul>
        {results.filteredData.map((item, idx) => (
          <li key={idx}>
            {item.cancer} - Genes: {item.genes.join(", ")} - Droga: {item.drug}
          </li>
        ))}
      </ul>
      <TestDetails tests={results.tests} />
      <Availability availability={results.availability} />
    </Card.Body>
  </Card>
);

export default Results;
