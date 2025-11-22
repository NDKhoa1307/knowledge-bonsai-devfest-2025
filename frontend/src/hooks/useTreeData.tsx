import { convertTreeToReactFlow, validateTreeData, type KnowledgeTreeData } from "@/data/mockData";
import { useMemo } from "react";

// useTreeData.ts
export function useTreeData(data: KnowledgeTreeData) {
  return useMemo(() => {
    const result = validateTreeData(data);
    if (!result.valid) {
      console.error("Tree data validation errors:", result.errors);
      return { nodes: [], edges: [], errors: result.errors };
    }

    const { nodes: dataNodes, edges: dataEdges } = convertTreeToReactFlow(data);
    return { dataNodes, dataEdges, errors: [] };
  }, [data]);
}
