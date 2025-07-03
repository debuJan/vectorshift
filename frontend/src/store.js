import create from 'zustand';
import { applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow';

export const useStore = create((set) => ({
  nodes: [],
  edges: [],
  
  // Generate a unique ID for a node based on its type and the current timestamp
  getNodeID: (type) => `${type}-${Date.now()}`,
  
  // Add a new node to the state
  addNode: (node) => set((state) => ({
    nodes: [...state.nodes, node],
  })),
  
  // Delete a node and any connected edges
  deleteNode: (nodeId) => set((state) => ({
    nodes: state.nodes.filter((node) => node.id !== nodeId),
    edges: state.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
  })),
  
  // Handle changes to nodes (e.g., position changes)
  onNodesChange: (changes) => set((state) => ({
    nodes: applyNodeChanges(changes, state.nodes),
  })),
  
  // Handle changes to edges (e.g., adding new edges or modifying existing ones)
  onEdgesChange: (changes) => set((state) => ({
    edges: applyEdgeChanges(changes, state.edges),
  })),
  
  // Handle the creation of a new connection (edge) between nodes
  onConnect: (connection) => set((state) => ({
    edges: addEdge(connection, state.edges),
  })),

  // New function to delete selected nodes and their connected edges
  deleteSelectedNodes: () => set((state) => {
    const selectedNodeIds = state.nodes.filter(node => node.selected).map(node => node.id);
    return {
      nodes: state.nodes.filter(node => !selectedNodeIds.includes(node.id)),
      edges: state.edges.filter(edge => !selectedNodeIds.includes(edge.source) && !selectedNodeIds.includes(edge.target)),
    };
  }),
}));
