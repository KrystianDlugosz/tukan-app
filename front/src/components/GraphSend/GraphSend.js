import React from 'react';

const GraphSend = ({ graphData, onBackendResponse }) => {
  const handleSaveGraph = () => {
    fetch('http://localhost:8080/solve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(graphData)
    })
    .then(response => {
      if (response.ok) {
        console.log('Request successful - connected to backend');
        return response.json(); // Zwrócenie danych z backendu do kolejnego .then()
      } else {
        console.error('Request failed:', response.status, response.statusText);
        throw new Error('Network response was not ok.');
      }
    })
    .then(data => {
      console.log('Response from backend:', data);
      // Tutaj możesz obsłużyć odpowiedź z backendu, np. zaktualizować stan aplikacji
    })
    .catch(error => {
      console.error('Error sending data to backend:', error);
      // Tutaj możesz obsłużyć błąd, np. wyświetlić komunikat dla użytkownika
    });

  };

  return (
    <button onClick={handleSaveGraph}>Zapisz graf na backendzie</button>
  );
};

export default GraphSend;
