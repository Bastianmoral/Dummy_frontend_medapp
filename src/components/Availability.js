import React from "react";

const Availability = ({ availability }) => (
  <div>
    <h5>Disponibilidad:</h5>
    <ul>
      {availability.map((item, idx) => (
        <li key={idx}>
          Droga: {item.drug}, Disponible: {item.available ? "Sí" : "No"}
        </li>
      ))}
    </ul>
  </div>
);

export default Availability;
