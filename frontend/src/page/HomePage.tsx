import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input, Card, Typography, Spin, Empty } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { treeService, type TreeListItem } from "../service";

const { Title, Text } = Typography;

export const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [trees, setTrees] = useState<TreeListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  useEffect(() => {
    // Check if username exists in localStorage
    const username = localStorage.getItem("username");
    if (!username) {
      // If no username, redirect to welcome page
      navigate("/welcome", { replace: true });
      return;
    }

    // Load trees
    loadTrees();
  }, [navigate]);

  useEffect(() => {
    // Load trees when search query changes
    const searchTerm = searchParams.get("search") || "";
    setSearchQuery(searchTerm);
    loadTrees(searchTerm);
  }, [searchParams]);

  const loadTrees = async (search?: string) => {
    setLoading(true);
    try {
      const data = await treeService.getAllTrees(search);
      setTrees(data);
    } catch (error) {
      console.error("Error loading trees:", error);
      setTrees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    if (value.trim()) {
      setSearchParams({ search: value.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleTreeClick = (treeId: number) => {
    navigate(`/trees/${treeId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="h-full overflow-auto p-6 space-y-6">
      <div>
        <Title level={2} className="mb-2!">
          Welcome to Knowledge Bonsai
        </Title>
        <Text type="secondary">
          Browse and explore knowledge trees created by the community
        </Text>
      </div>

      {/* Search Bar */}
      <Card className="border border-gray-200">
        <Input
          size="large"
          placeholder="Search trees by title or owner name..."
          prefix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onPressEnter={(e) => handleSearch(e.currentTarget.value)}
          allowClear
          onClear={() => {
            setSearchQuery("");
            setSearchParams({});
          }}
        />
      </Card>

      {/* Trees Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Spin size="large" />
        </div>
      ) : trees.length === 0 ? (
        <Card>
          <Empty
            description={
              searchQuery
                ? "No trees found matching your search"
                : "No trees available"
            }
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trees.map((tree) => (
            <Card
              key={tree.id}
              hoverable
              className="cursor-pointer border border-gray-200 transition-shadow hover:shadow-lg"
              onClick={() => handleTreeClick(tree.id)}
            >
              <div className="space-y-3">
                <Title level={4} className="mb-2! text-gray-800!">
                  {tree.title}
                </Title>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>👤</span>
                  <Text type="secondary">{tree.owner.name}</Text>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Created: {formatDate(tree.createdAt)}</span>
                  <span>Updated: {formatDate(tree.updatedAt)}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

