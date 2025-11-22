import { useTreeData } from "@/hooks/useTreeData";
import { edgeTypes } from "../../types/EdgeTypes";
import { nodeTypes } from "../../types/NodeTypes";
import { useCallback, useState } from "react";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  ConnectionMode,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
} from "reactflow";
import { mockFrontendTree } from "@/data/mockData";
import { Quiz } from "../Quiz";

function TreePage() {
  const { dataNodes, dataEdges } = useTreeData(mockFrontendTree);
  const [nodes, setNodes] = useState(dataNodes == undefined || dataNodes.length === 0 ? [] : dataNodes);
  const [edges, setEdges] = useState(dataEdges == undefined || dataEdges.length === 0 ? [] : dataEdges);

  const onNodesChange: OnNodesChange = useCallback((changes) => {
    changes.forEach((change) => {
      if (change.type === "position" && change.position) {
        console.log(`Node "${change.id}" moved to: x=${change.position.x}, y=${change.position.y}`);
      }
    });

    setNodes((nds) => applyNodeChanges(changes, nds ?? []));
  }, []);

  const onEdgesChange: OnEdgesChange = useCallback((changes) => {
    changes.forEach((change) => {
      console.log("Edge change:", change);
    });

    setEdges((eds) => applyEdgeChanges(changes, eds ?? []));
  }, []);

  const onConnect: OnConnect = useCallback((params) => {
    setEdges((edgeSnapshot) => {
      console.log("Connectinge edges:", params);
      return addEdge({ ...params, type: "branch" }, edgeSnapshot);
    });
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionMode={ConnectionMode.Loose} // This make it possible to connect to any handle / source
        fitView
      >
        <Panel position="top-center" className="text-black">
          Somebody's bonsai
        </Panel>
        
        {/* Quiz Button in Top Right Corner */}
        <Panel position="top-right" style={{ margin: 10 }}>
          <Quiz />
        </Panel>
        
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default TreePage;
