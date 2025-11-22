import { useTreeData } from "@/hooks/useTreeData";
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
  type Node,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
} from "reactflow";
import { mockFrontendTree, type KnowledgeTreeData } from "@/data/mockData";
import { Quiz } from "../Quiz";
import { treeService, type GetTreeResponse } from "@/service";
import { RegenerateTreePage } from "./RegenerateTreePage";
import { NodeInformationPage } from "./NodeInformationPage";
import { nodeService, type NodeInfoExtractedResponse } from "@/service/nodeService";

function TreePage({ treeId }: { treeId?: string }) {
  const [fetchedTreeData, setFetchedTreeData] = useState<KnowledgeTreeData | null>(null);
  const [metadata, setMetadata] = useState<GetTreeResponse | null>(null);
  const { dataNodes, dataEdges } = useTreeData(fetchedTreeData);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isNodeInfoOpen, setIsNodeInfoOpen] = useState(false);

  useEffect(() => {
    const fetchTree = async () => {
      if (treeId == null || treeId == undefined || treeId == "") {
        console.warn("Tree ID is null, undefined, or empty, using sample data");
        setFetchedTreeData(mockFrontendTree);
        return;
      }
      const response = await treeService.getTreeById(treeId);
      console.log("Fetched tree response:", response);
      if (response) {
        if (response.treeData == null) {
          console.warn("Tree data is null, using sample data");
          setFetchedTreeData(mockFrontendTree);
          return;
        }
        setFetchedTreeData(response.treeData);
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

  const onNodeClick = async (event: React.MouseEvent, node: Node) => {
    console.log("Clicked node:", node);
    setIsNodeInfoOpen(true);
    setSelectedNode(node);
  };

  const fetchNodeInfo = async (treeId: string, nodeId: string): Promise<NodeInfoExtractedResponse | null> => {
    const result = await nodeService.getNodeInfo(metadata?.id ?? "-1", nodeId);
    if (result) {
      console.log("Fetched node info:", result);
      return result;
    } else {
      console.warn("No node info found for node ID:", nodeId);
      return null;
    }
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
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

        {/* Quiz Button in Top Right Corner */}
        <Panel position="top-right" style={{ margin: 10 }}>
          <Quiz />
        </Panel>

        {/* <Panel position="bottom-center" style={{ margin: 10 }}>
          <RegenerateTreePage
            onTreeGenerated={(tree) => {
              console.log("🌳 New tree generated:", tree);
              setFetchedTreeData(tree);
            }}
          />
        </Panel> */}

        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
      {
        /* Node Information Drawer */
        isNodeInfoOpen && (
          <NodeInformationPage
            open={isNodeInfoOpen}
            onClose={() => setIsNodeInfoOpen(false)}
            nodeTitle={selectedNode?.data?.label}
            fetchNodeInfo={() => fetchNodeInfo(metadata?.id ?? "-1", selectedNode?.data?.nodeId ?? "-1")}
          />
        )
      }
    </div>
  );
}

export default TreePage;
