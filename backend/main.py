from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

class PipelineData(BaseModel):
    nodes: List[Dict]
    edges: List[Dict]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    # Function to determine if the graph is a DAG
    def is_dag(edges):
        from collections import defaultdict, deque
        
        graph = defaultdict(list)
        indegree = defaultdict(int)
        
        # Create adjacency list and calculate in-degrees
        for edge in edges:
            source = edge['source']
            target = edge['target']
            graph[source].append(target)
            indegree[target] += 1
            if source not in indegree:
                indegree[source] = 0

        # Topological sort using Kahn's algorithm
        queue = deque([node for node in indegree if indegree[node] == 0])
        topo_order = []
        
        while queue:
            node = queue.popleft()
            topo_order.append(node)
            for neighbor in graph[node]:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    queue.append(neighbor)

        # If topo_order contains all the nodes, then it's a DAG
        return len(topo_order) == len(indegree)
    
    is_dag_result = is_dag(pipeline.edges)
    
    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag_result}
