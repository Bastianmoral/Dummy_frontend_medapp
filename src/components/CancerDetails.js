import React, { useEffect, useState } from "react";
import api from "../services/apiService";

const CancerDetails = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/cancer-details");
        setDetails(response.data.data); // Suponiendo que el backend devuelve { data: [...] }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Cancer Details</h1>
      <ul>
        {details.map((detail) => (
          <li key={detail.subject}>
            {detail.subject}: {detail.topography_description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CancerDetails;
