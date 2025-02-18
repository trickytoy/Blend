import React, { useCallback, useEffect, useState } from 'react';
import {
  Background,
  ReactFlow,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { initialNodes, initialEdges } from '@/data/coursesOnly'; // Importing nodes and edges

const hierarchicalOrdering = (nodes, edges) => {
  let levels = {};

  nodes.forEach((node) => {
    const level = node.data.label[4];
    if (!levels[level]) {
      levels[level] = [];
    }
    levels[level].push(node);
  });

  for (const level in levels) {
    levels[level] = levels[level].sort((a, b) => {
      if (typeof a.data.label === 'string' && typeof b.data.label === 'string') {
        return a.data.label.localeCompare(b.data.label);
      }
      return a.data.label - b.data.label;
    });
  }

  Object.keys(levels)
    .sort()
    .forEach((level) => {
      levels[level].forEach((node) => {
        if (level == 1) {
          node.style = { backgroundColor: '#6ede87' };
        } else if (level == 2) {
          node.style = { backgroundColor: '#8ecae6' };
        } else if (level == 3) {
          node.style = { backgroundColor: '#219ebc' };
        } else if (level == 4) {
          node.style = { backgroundColor: '#ffb703' };
        } else if (level == 6) {
          node.style = { backgroundColor: '#fb8500' };
        } else if (level == 9) {
          node.style = { backgroundColor: '#e76f51' };
        }
      });
    });

  let curr_y = 0;
  const temp_nodes = [];
  const max_level = Math.max(...Object.keys(levels).map(Number));

  Object.keys(levels)
    .sort()
    .forEach((level) => {
      let curr_x = (max_level - level) * 100;
      levels[level].forEach((node, index) => {
        node.position.x = curr_x + (index - Math.floor(levels[level].length / 2)) * 200;
        node.position.y = curr_y;
        temp_nodes.push(node);
      });
      curr_y += 200;
    });

    console.log(nodes[0], nodes[2])

    //fixing a bit of the ordering :(
    nodes[2].position.x = nodes[2].position.x + 500
    nodes[2].position.y = nodes[2].position.y - 400

    nodes[0].position.x = nodes[0].position.x + 100
    nodes[0].position.y = nodes[0].position.y - 200


    

  return { nodes: temp_nodes, edges };
};

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes.map((node) => ({
      ...node,
      type: "tooltip", // Assign custom node type
    }))
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialEdges.map((edge) => ({
      ...edge,
      type: 'smoothstep',
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
      },
    }))
  );
  const [highlightedEdges, setHighlightedEdges] = useState([]);
  const [hoveredNode, setHoveredNode] = useState(null); // New state for hovered node
  const [isPanelHovered, setIsPanelHovered] = useState(false);

  const onRadialLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = hierarchicalOrdering(
      nodes,
      edges
    );
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  }, [nodes, edges, setNodes, setEdges]);


  const [isSelectable, setIsSelectable] = useState(true);

  const handleNodeClick = useCallback(
    (event, node) => {
      const connectedEdges = edges.map((edge) => {
        if (edge.source === node.id || edge.target === node.id) {
          return {
            ...edge,
            style: {
              ...edge.style,
              stroke: '#FF0000', // Highlight color for edges
              strokeWidth: 3,
            },
          };
        }
        setHoveredNode(node);
        return {
          ...edge,
          style: {
            ...edge.style,
            stroke: '#000000', // Reset other edges
            strokeWidth: 1,
          },
        };
      });
      setEdges(connectedEdges);
    },
    [edges, setEdges]
  );

  useEffect(() => {
    onRadialLayout();
  }, []);

  const handleMouseEnter = (event, node) => {

  };

  const handleMouseLeave = () => {
  };

  const handleClosePanel = () => {
    setHoveredNode(null); // Clear the hoveredNode when closing the panel
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={handleNodeClick} // Add the event handler for node click
      elementsSelectable={isSelectable}
      onNodeMouseEnter={handleMouseEnter} // Add the event handler for mouse enter
      onNodeMouseLeave={handleMouseLeave} // Add the event handler for mouse leave
      style={{ backgroundColor: '#F7F9FB' }}
      elevateEdgesOnSelect={true}
      fitView={{ nodes: nodes[0]}}
      
    >
    <Panel
      position="top-left"
      style={{
        marginTop: '20px',
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: 'white',
        width: '300px',
        boxShadow: isPanelHovered ? '0 6px 12px rgba(0, 0, 0, 0.2)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
        zIndex: 1000,
        fontFamily: '"Inter", sans-serif', // Modern font
      }}
      onMouseEnter={() => setIsPanelHovered(true)}
      onMouseLeave={() => setIsPanelHovered(false)}
    >
      <button
        onClick={handleClosePanel}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '18px',
          cursor: 'pointer',
          color: '#888',
          transition: 'color 0.3s',
        }}
        onMouseEnter={(e) => (e.target.style.color = '#000')}
        onMouseLeave={(e) => (e.target.style.color = '#888')}
      >
        &times;
      </button>

      <div>
        {hoveredNode ? (
          <>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: '#333', letterSpacing: '0.5px' }}>
              {hoveredNode.data.label} - {hoveredNode.data.title}
            </h3>
            <p style={{ fontSize: '15px', color: '#555', marginBottom: '8px', lineHeight: '1.5' }}>
              {hoveredNode.data.Description}
            </p>
            <p style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
              {hoveredNode.data.Condition}
            </p>
          </>
        ) : (
          <h3 style={{ fontSize: '16px', color: '#888', fontWeight: '400', letterSpacing: '0.3px' }}>
            Click on a course to see Course Detail...
          </h3>
        )}
      </div>
    </Panel>

      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
};

export default Flow;
