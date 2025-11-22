import BranchNode from "@/components/Trees/Nodes/BranchNode";
import BranchNodeRight from "@/components/Trees/Nodes/BranchNodeRight";
import LeafNode from "@/components/Trees/Nodes/LeafNode";
import RootNode from "@/components/Trees/Nodes/RootNode";
import TrunkNode from "@/components/Trees/Nodes/TrunkNode";

const nodeTypes = {
  // Define your custom node types here
  trunk: TrunkNode,
  branch: BranchNode,
  branchRight: BranchNodeRight,
  leaf: LeafNode,
  root: RootNode,
  pot: RootNode,
};

export { nodeTypes };
