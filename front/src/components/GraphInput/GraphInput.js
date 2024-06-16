import React, { useState } from 'react';

function GraphInput({ onSubmit, onAddNode }) {
  const [newNode, setNewNode] = useState('');


  const handleNodeSubmit = (e) => {
    e.preventDefault();
    
    // Sprawdź czy newNode nie jest pusty
    if (newNode.trim() === '') {
      console.warn('Nazwa węzła nie może być pusta.');
      return;
    }
  
    // Sprawdź czy węzeł o takiej samej nazwie już istnieje
    if (nodes.some(node => node.label === newNode)) {
      console.warn('Węzeł o tej nazwie już istnieje.');
      return;
    }
  
    // Wywołaj funkcję onAddNode tylko jeśli spełnione są warunki walidacji
    onAddNode(newNode);
    setNewNode('');
  };
  return (
    <div>
      <form onSubmit={handleNodeSubmit}>
        <div>
          <label>Dodaj węzeł:</label>
          <input 
            type="text" 
            value={newNode} 
            onChange={e => setNewNode(e.target.value)} 
          />
        </div>
        <button type="submit">Dodaj węzeł</button>
      </form>
    </div>
  );
}

export default GraphInput;
