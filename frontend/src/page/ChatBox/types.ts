export interface Message {
  id: string;
  username: string;
  content: {
    text: string;
  };
  timesend: string;
  isAI?: boolean;
}

export interface ChatBoxProps {
  username: string;
  onTreeGenerated?: (treeData: any) => void;
}

