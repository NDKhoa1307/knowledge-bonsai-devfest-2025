import { useState } from 'react';
import { ChatBox } from './ChatBox';
import { useNavigate } from 'react-router-dom';
import { type KnowledgeTreeData } from '../data/mockData';

export const ChatPage = () => {
  const navigate = useNavigate();
  const [username] = useState(() => {
    // Get username from localStorage or use default
    return localStorage.getItem('username') || 'User';
  });

  const handleTreeGenerated = (treeData: KnowledgeTreeData) => {
    console.log('Tree data received:', treeData);
    
    // Store the tree data in localStorage or state management
    localStorage.setItem('latestTree', JSON.stringify(treeData));
    
    // Show success notification
    alert('🌳 Your learning tree has been generated! Redirecting to view...');
    
    // Navigate to graph page to visualize the tree
    navigate('/graph');
  };

  return (
    <ChatBox 
      username={username} 
      onTreeGenerated={handleTreeGenerated}
    />
  );
};

