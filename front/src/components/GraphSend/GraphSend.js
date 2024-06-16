import React from 'react';

const GraphSend = ({ graphData }) => {
  const handleSaveGraph = () => {
    fetch('url_do_twojego_backendu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(graphData)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      console.log('Response from backend:', data);
      // Tutaj możesz obsłużyć odpowiedź z backendu, np. zaktualizować stan aplikacji
    })
    .catch(error => {
      console.error('Error sending data to backend:', error);
    });
  };

  return (
    <button onClick={handleSaveGraph}>Zapisz graf na backendzie</button>
  );
};

export default GraphSend;
