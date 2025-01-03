import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import { Table, Container } from "react-bootstrap";

const SellerView = ({ handleLogout }) => {
  const [sales, setSales] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    apiService.getSales().then((response) => setSales(response.data));
    apiService.getInventory().then((response) => setInventory(response.data));
    const fetchSales = async () => {
      try {
        const response = await apiService.getSales();
        setSales(response.data || []); // Asegura que data sea un array
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };
    fetchSales();
  }, []);

  return (
    <Container>
      <h2>Vendedor Dashboard</h2>
      <h4>Mis Ventas</h4>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {sales.length > 0 ? (
            sales.map((sale, index) => (
              <tr key={index}>
                <td>{sale.product}</td>
                <td>{sale.quantity}</td>
                <td>{sale.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='3'>No hay datos de ventas</td>
            </tr>
          )}
        </tbody>
      </Table>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </Container>
  );
};

export default SellerView;
