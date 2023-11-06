import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface ItemDetails {
  name: string;
  height: string;
  mass: string;
  // Add more details here
}

const Details: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [details, setDetails] = useState<ItemDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  console.log(1);
  console.log(itemId);

  useEffect(() => {
    // Fetch item details based on the itemId
    // You should replace this URL with the actual API endpoint
    fetch(`https://swapi.dev/api/people/${itemId}/`)
      .then((response) => response.json())
      .then((data: ItemDetails) => {
        setDetails(data);
        setLoading(false);
        console.log(1);

        console.log(itemId);
      })
      .catch((error) => {
        console.error('Error fetching details', error);
        setLoading(false);
        console.log(1);

        console.log(itemId);
      });
  }, [itemId]);

  const closeDetails = () => {
    // You can use the browser's history to navigate back
    window.history.back();
  };

  return (
    <div className="details-container">
      <button className="close-button" onClick={closeDetails}>
        Close
      </button>
      {loading ? (
        <div className="loading-message">Loading details...</div>
      ) : details ? (
        <div className="item-details">
          <h2>{details.name}</h2>
          <p>Height: {details.height}cm</p>
          <p>Mass: {details.mass}kg</p>
          {/* Add more details here */}
        </div>
      ) : (
        <div className="error-message">Failed to load details.</div>
      )}
    </div>
  );
};

export default Details;
