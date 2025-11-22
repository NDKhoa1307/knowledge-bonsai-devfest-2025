import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography } from "antd";
import type { FormProps } from "antd";

const { Title, Text } = Typography;

export const WelcomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if username already exists in localStorage
    const username = localStorage.getItem("username");
    if (username) {
      // If username exists, redirect to home
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const onFinish: FormProps<{ name: string }>["onFinish"] = (values) => {
    setLoading(true);
    // Save name to localStorage
    localStorage.setItem("username", values.name.trim());
    // Redirect to HomePage
    navigate("/", { replace: true });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-6">
          <Title level={2} className="!mb-2">
            Welcome to Knowledge Bonsai
          </Title>
          <Text type="secondary" className="text-base">
            Let's get started by entering your name
          </Text>
        </div>

        <Form
          name="welcome-form"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="name"
            label="Your Name"
            rules={[
              { required: true, message: "Please enter your name" },
              { min: 2, message: "Name must be at least 2 characters" },
              { max: 50, message: "Name must be less than 50 characters" },
            ]}
          >
            <Input placeholder="Enter your name" autoFocus />
          </Form.Item>

          <Form.Item className="!mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Continue
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

