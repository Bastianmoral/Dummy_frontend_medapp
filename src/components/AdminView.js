import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import { Table, Button, Container } from "react-bootstrap";

const AdminView = ({ handleLogout }) => {
  const [sellerPerformance, setSellerPerformance] = useState([]);

  useEffect(() => {
    const fetchSellerPerformance = async () => {
      try {
        const response = await apiService.getSellerPerformance();
        setSellerPerformance(response.data || []); // Asegura que data sea un array
      } catch (error) {
        console.error("Error fetching seller performance:", error);
      }
    };

    fetchSellerPerformance();
  }, []);

  return (
    <Container>
      <h2>Admin Dashboard</h2>
      <h4>Desempeño de Vendedores</h4>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ventas Totales</th>
            <th>Última Actividad</th>
          </tr>
        </thead>
        <tbody>
          {sellerPerformance.length > 0 ? (
            sellerPerformance.map((seller, index) => (
              <tr key={index}>
                <td>{seller.name}</td>
                <td>{seller.totalSales}</td>
                <td>{seller.lastActivity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='3'>No hay datos disponibles</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Button variant='primary' className='mt-3'>
        Gestionar Usuarios
      </Button>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </Container>
  );
};

export default AdminView;
