import { useTreeData } from "@/hooks/useTreeData";
import SVGProvider from "../../components/Trees/SVGProvider";
import { sampleNodes, sampleEdges } from "../../data/SampleBonsai";
import { edgeTypes } from "../../types/EdgeTypes";
import { nodeTypes } from "../../types/NodeTypes";
import { useCallback, useEffect, useState } from "react";
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
import { mockFrontendTree, type BackendTreeResponse, type KnowledgeTreeData } from "@/data/mockData";
import axios from "axios";
import { treeService, type GetTreeResponse } from "@/service";

function TreePage() {
  const [fetchedTreeData, setFetchedTreeData] = useState<KnowledgeTreeData | null>(null);
  const [metadata, setMetadata] = useState<GetTreeResponse | null>(null);
  const { dataNodes, dataEdges } = useTreeData(fetchedTreeData);

  useEffect(() => {
    const fetchTree = async () => {
      const response = await treeService.getTreeById("1");
      console.log("Fetched tree response:", response);
      if (response) {
        if (response.treeData == null) {
          console.warn("Tree data is null, using sample data");
          setFetchedTreeData(mockFrontendTree);
        } else {
          setFetchedTreeData(response.treeData);
        }
        setMetadata(response);
      }
    };

    fetchTree();
  }, []);

  const [nodes, setNodes] = useState(dataNodes == undefined || dataNodes.length === 0 ? [] : dataNodes);
  const [edges, setEdges] = useState(dataEdges == undefined || dataEdges.length === 0 ? [] : dataEdges);

  // Update state when tree data becomes available
  useEffect(() => {
    if (dataNodes && dataNodes.length > 0) {
      setNodes(dataNodes == null ? [] : dataNodes);
    }
    if (dataEdges && dataEdges.length > 0) {
      setEdges(dataEdges == null ? [] : dataEdges);
    }
  }, [dataNodes, dataEdges]);

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
        <Panel position="top-left" className="text-black">
          {metadata ? (
            <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-lg p-2 shadow-md">
              <h2 className="text-lg font-bold">{metadata.title}</h2>
            </div>
          ) : (
            "Somebody's bonsai"
          )}
        </Panel>
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default TreePage;
