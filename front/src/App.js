import React, { useState } from 'react';
import GraphDisplay from './components/GraphDisplay/GraphDisplay';

const App = () => {
  const [nodes, setNodes] = useState([
    { id: 'S', label: 'S', x: 150, y: 550 },
    { id: 'P', label: 'P', x: 650, y: 100 }
  ]);
  const [edges, setEdges] = useState([]);

  const addNode = (point) => {
    setNodes([...nodes, point]);
  };

  const addEdge = (edge) => {
    const fromNode = nodes.find(node => node.id === edge.from);
    const toNode = nodes.find(node => node.id === edge.to);

    if (fromNode && toNode) {
      setEdges([...edges, edge]);
    } else {
      console.error('Invalid edge: nodes not found');
    }
  };

  const clearNodes = () => {
    setNodes(nodes.slice(0, 2)); // Zachowaj tylko punkty 'S' i 'P'
    setEdges([]);
  };

  const removeLastNode = () => {
    if (nodes.length > 2) {
      const newNodes = nodes.slice(0, -1);
      setNodes(newNodes);
      const lastNode = nodes[nodes.length - 1];
      setEdges(edges.filter(edge => edge.from !== lastNode.id && edge.to !== lastNode.id));
    }
  };

  return (
    <div className="App">
      <h1>Mapa dżungli</h1>
      <GraphDisplay
        nodes={nodes}
        edges={edges}
        onAddNode={addNode}
        onAddEdge={addEdge}
        onRemoveAllNodes={clearNodes}
        onRemoveLastNode={removeLastNode}
      />
    </div>
  );
};

export default App;
