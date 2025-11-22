import { Button } from "antd";

export default function RegenerateTreeButton({ onClick }: { onClick: () => void }) {
  return (
    <Button type="primary" onClick={onClick} size="large">
      Regenerate Tree
    </Button>
  );
}
