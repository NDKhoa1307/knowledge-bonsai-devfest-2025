import BranchEdge from "@/components/Trees/Edges/BranchEdge";
import ButtonEdge from "@/components/Trees/Edges/ButtonEdge";
import TrunkEdge from "@/components/Trees/Edges/TrunkEdge";

const edgeTypes = {
  // Define your custom edge types here
  branch: BranchEdge,
  button: ButtonEdge,
  trunk: TrunkEdge,
};

export { edgeTypes };
