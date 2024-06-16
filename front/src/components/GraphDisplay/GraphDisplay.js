import React, { useState, useEffect } from 'react';
import { Graph } from 'react-d3-graph';
import './GraphDisplay.css';
import GraphSend from '../GraphSend/GraphSend';

function GraphDisplay({ nodes, edges, onAddEdge, onAddNode, onRemoveAllNodes, onRemoveLastNode }) {
  const [points, setPoints] = useState(nodes);
  const [graphEdges, setGraphEdges] = useState([]);
  const [backendData, setBackendData] = useState(null); 

  const generatePointName = () => {
    const usedNames = points.map(point => point.id);
    const alphabet = 'ABCDEFGHIJKLMNOQRTUVWXYZ';
    for (let i = 0; i < alphabet.length; i++) {
      const letter = alphabet[i];
      if (!usedNames.includes(letter)) {
        return letter;
      }
    }
    return ''; // Jeśli wszystkie litery są już użyte
  };

  // useEffect(() => {
  //   fetchGraphData(); // Pobranie danych z backendu przy pierwszym renderowaniu
  // }, []);

  // const fetchGraphData = () => {
  //   GraphSend.fetchGraphData()
  //     .then(response => {
  //       setBackendData(response.data); // Ustawienie danych pobranych z backendu w stanie
  //     })
  //     .catch(error => {
  //       console.error('Błąd podczas pobierania danych z backendu:', error);
  //       // Obsługa błędu, np. wyświetlenie komunikatu o niepowodzeniu
  //     });
  // };

  const handleImageClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const point = {
      id: generatePointName(),
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      label: generatePointName(),
    };
    setPoints([...points, point]);
    if (onAddNode) {
      onAddNode(point);
    }
  };

  const handleEdgeSubmit = (event) => {
    event.preventDefault();
    const { from, to, weight } = event.target.elements;

    if (from.value && to.value && weight.value) {
      const newEdge = {
        from: from.value,
        to: to.value,
        weight: parseFloat(weight.value),
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
      };

      const fromNode = points.find(node => node.id === newEdge.from);
      const toNode = points.find(node => node.id === newEdge.to);

      if (fromNode && toNode) {
        newEdge.startX = fromNode.x;
        newEdge.startY = fromNode.y;
        newEdge.endX = toNode.x;
        newEdge.endY = toNode.y;

        // Sprawdzenie czy krawędź już istnieje
        if (!graphEdges.find(edge => edge.from === newEdge.from && edge.to === newEdge.to)) {
          setGraphEdges([...graphEdges, newEdge]);
          if (onAddEdge) {
            onAddEdge(newEdge);
          }
        } else {
          console.warn('Krawędź już istnieje:', newEdge);
        }
      } else {
        console.error('Invalid edge: nodes not found');
      }
    }

    event.target.reset();
  };

  const handleRemoveAllNodes = () => {
    setPoints((prevPoints) => prevPoints.filter((point) => point.id === 'S' || point.id === 'P'));
    setGraphEdges([]);
    if (onRemoveAllNodes) {
      onRemoveAllNodes();
    }
  };

  const handleRemoveLastNode = () => {
    const lastNode = points[points.length - 1];
    if (lastNode.id !== 'S' && lastNode.id !== 'P') {
      setPoints(points.slice(0, -1));
      setGraphEdges(graphEdges.filter(edge => edge.from !== lastNode.id && edge.to !== lastNode.id));
      if (onRemoveLastNode) {
        onRemoveLastNode(lastNode);
      }
    }
  };

  const graphConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: 'lightgreen',
      size: 300,
      highlightStrokeColor: 'blue',
      labelProperty: 'label',
    },
    link: {
      highlightColor: 'lightblue',
      renderLabel: true,
      labelProperty: 'label',
    },
    staticGraph: true,
  };

  const graphData = {
    nodes: points.map((point) => ({ id: point.id, label: point.label })),
    links: edges.map((edge, index) => ({
      source: edge.from,
      target: edge.to,
      label: `Edge ${index + 1}`,
    })),
  };

  const handleSaveGraph = () => {
    const graphDataToSend = {
      nodes: points.map(point => point.id), // Format wierzchołków na podstawie aktualnych punktów
      edges: graphEdges.map(edge => ({
        from: edge.from,
        to: edge.to,
        weight: edge.weight
      }))
    };
    // Możesz tutaj użyć komponentu GraphApiService do wysłania danych na backend
    console.log('na backend:', graphDataToSend);
    // <GraphApiService graphData={graphDataToSend} />
    // Usunięto powyższy kod, aby uniknąć przypadkowego wysłania żądania podczas testowania.
  };

  return (
    <div className="graph-container">
      <h2>Mapa dżungli</h2>
      <form onSubmit={handleEdgeSubmit}>
        <input type="text" name="from" placeholder="Punkt początkowy" />
        <input type="text" name="to" placeholder="Punkt końcowy" />
        <input type="number" name="weight" placeholder="Waga" />
        <button type="submit">Dodaj krawędź</button>
      </form>
      <button onClick={handleRemoveAllNodes}>Usuń wszystkie punkty</button>
      <button onClick={handleRemoveLastNode}>Usuń ostatni punkt</button>
      <div className="image-container" onClick={handleImageClick}>
        <img src="/map.png" alt="Map" />
        {points.map((point) => (
          <div
            key={point.id}
            className="node"
            style={{ left: point.x, top: point.y }}
          >
            {point.label}
          </div>
        ))}
        {graphEdges.map((edge, index) => (
          <Line key={index} edge={edge} />
        ))}
      </div>
      <Graph
        id="graph-id"
        data={graphData}
        config={graphConfig}
      />
      <button onClick={handleSaveGraph}>Pokaż najkrótszą scieżkę z punktu S do punktu P</button>
       {/* Wyświetlanie danych z backendu, jeśli są dostępne */}
       {backendData && (
        <div>
          <h3>Dane pobrane z backendu:</h3>
          <pre>{JSON.stringify(backendData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

const Line = ({ edge }) => {
  const lineStyle = {
    position: 'absolute',
    left: edge.startX,
    top: edge.startY,
    width: Math.sqrt(Math.pow(edge.endX - edge.startX, 2) + Math.pow(edge.endY - edge.startY, 2)),
    height: '3px',
    backgroundColor: 'black',
    transformOrigin: 'top left',
    transform: `rotate(${Math.atan2(edge.endY - edge.startY, edge.endX - edge.startX)}rad)`,
    zIndex: 1,
  };

  const labelStyle = {
    position: 'absolute',
    left: (edge.startX + edge.endX) / 2,
    top: (edge.startY + edge.endY) / 2,
  };

  return (
    <>
      <div className="line" style={lineStyle}></div>
      <div className="edge-weight" style={labelStyle}>{edge.weight}</div>
    </>
  );
};
  

export default GraphDisplay;
