import type { NodeInfoExtractedResponse } from "@/service/nodeService";
import { Drawer } from "antd";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

interface NodeInfoPageProps {
  open: boolean;
  onClose: () => void;
  nodeTitle?: string;
  nodeLinks?: string[];
  nodeContent?: string;
  fetchNodeInfo?: () => Promise<NodeInfoExtractedResponse | null>;
}

export const NodeInformationPage = ({ open, onClose, nodeTitle, fetchNodeInfo }: NodeInfoPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [nodeContent, setNodeContent] = useState<string | undefined>(undefined);
  const [nodeLinks, setNodeLinks] = useState<string[] | undefined>(undefined);

  // Call the parent to get the data of this node when the drawer opens
  useEffect(() => {
    if (!open) return;
    if (!fetchNodeInfo) return;

    setIsLoading(true);
    fetchNodeInfo()
      .then((data) => {
        if (data) {
          setNodeContent(data.content);
          setNodeLinks(data.links);
        } else {
          setNodeContent(undefined);
          setNodeLinks(undefined);
        }
      })
      .finally(() => setIsLoading(false));
  }, [open, fetchNodeInfo]);

  return (
    <Drawer
      title={
        <div style={{ textAlign: "center", padding: "8px 0" }}>
          <h3 style={{ margin: 0 }} className="text-2xl font-bold">
            {nodeTitle ?? "Node Information"}
          </h3>
        </div>
      }
      placement="right"
      width={720}
      open={open}
      onClose={onClose}
      footer={null}
      loading={isLoading}
    >
      {nodeContent ? (
        <div>
          <div className="prose prose-lg max-w-none">
            <Markdown>{nodeContent}</Markdown>
          </div>
          <h4 className="text-xl font-bold">References</h4>
          <ul className="list-disc list-inside">
            {nodeLinks && nodeLinks.length > 0 ? (
              nodeLinks.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {link}
                  </a>
                </li>
              ))
            ) : (
              <li>No references available.</li>
            )}
          </ul>
        </div>
      ) : (
        <Markdown>No information available for this node.</Markdown>
      )}
    </Drawer>
  );
};
