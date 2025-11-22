import { useState } from "react";
import { Drawer } from "antd";
import { Button } from "antd";
import { ChatBox } from "../ChatBox";
import { type KnowledgeTreeData } from "@/data/mockData";

interface RegenerateTreeProps {
  onTreeGenerated?: (tree: KnowledgeTreeData) => void;
}

export const RegenerateTreePage = ({ onTreeGenerated }: RegenerateTreeProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* The button shown inside <Panel> */}
      <Button type="primary" onClick={handleOpen} size="large">
        Regenerate Tree
      </Button>

      {/* Drawer UI (same style as Quiz) */}
      <Drawer
        title={
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <h3 style={{ margin: 0 }}>Regenerate Your Knowledge Bonsai</h3>
          </div>
        }
        placement="right"
        width={720}
        open={open}
        onClose={handleClose}
        footer={null}
      >
        <ChatBox
          username="Anonymous user"
          onTreeGenerated={(tree) => {
            console.log("🌳 New tree generated:", tree);
            onTreeGenerated?.(tree);
            handleClose(); // auto-close drawer after generating tree (optional)
          }}
        />
      </Drawer>
    </>
  );
};
