import api from './api';
import {
  type KnowledgeTreeData,
  type BackendTreeResponse,
  convertTreeToReactFlow,
  validateTreeData
} from '../data/mockData';
import { type Node, type Edge } from 'reactflow';

/**
 * Tree Service - Handles all tree-related API calls
 */

export interface TreeListItem {
  id: number;
  ownerId: number;
  title: string;
  bucket_url: string;
  createdAt: string;
  updatedAt: string;
  owner: TreeOwner;
}

export interface TreeOwner {
  id: string;
  name: string;
  email: string;
}

export interface GetTreeResponse {
  id: string;
  ownerId: string;
  title: string;
  bucket_url: string;
  treeData: KnowledgeTreeData | null;    // unknown structure; keep as any or replace with a proper type
  createdAt: string;       // ISO datetime string
  updatedAt: string;       // ISO datetime string
  owner: TreeOwner;
}


export const treeService = {
  /**
   * Get all trees
   */
  getAllTrees: async (search?: string): Promise<TreeListItem[]> => {
    const params = search ? { search } : {};
    const response = await api.get<TreeListItem[]>('/trees', { params });
    return response.data;
  },

  /**
   * Get a single tree by ID
   */
  getTreeById: async (id: string): Promise<GetTreeResponse | null> => {
    try {
      const localTreeData = localStorage.getItem(`lastTreeId`);
      // After get, invalidate the local tree id
      localStorage.removeItem(`lastTreeId`);
      const idToUse = localTreeData ? localTreeData : id;
      const response = await api.get<GetTreeResponse>(`/trees/${idToUse}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tree by ID:', error);
      return null;
    }
  },

  /**
   * Get tree and convert to ReactFlow format
   */
  getTreeForVisualization: async (id: string): Promise<{
    nodes: Node[];
    edges: Edge[];
    metadata: KnowledgeTreeData['metadata'];
  }> => {
    const treeData = await treeService.getTreeById(id);
    const { nodes, edges } = convertTreeToReactFlow(treeData);

    return {
      nodes,
      edges,
      metadata: treeData.metadata,
    };
  },

  /**
   * Create a new tree
   */
  createTree: async (data: KnowledgeTreeData): Promise<{ id: string; tree: KnowledgeTreeData }> => {
    // Validate before sending
    const validation = validateTreeData(data);
    if (!validation.valid) {
      throw new Error(`Invalid tree data: ${validation.errors.join(', ')}`);
    }

    const response = await api.post<{ id: string; tree: KnowledgeTreeData }>('/trees', data);
    return response.data;
  },

  /**
   * Update an existing tree
   */
  updateTree: async (id: string, data: KnowledgeTreeData): Promise<KnowledgeTreeData> => {
    // Validate before sending
    const validation = validateTreeData(data);
    if (!validation.valid) {
      throw new Error(`Invalid tree data: ${validation.errors.join(', ')}`);
    }

    const response = await api.put<BackendTreeResponse>(`/trees/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete a tree
   */
  deleteTree: async (id: string): Promise<void> => {
    await api.delete(`/trees/${id}`);
  },

  /**
   * Add a node to an existing tree
   */
  addNode: async (
    treeId: string,
    parentId: string,
    nodeData: {
      label: string;
      type: 'trunk' | 'leaf';
    }
  ): Promise<KnowledgeTreeData> => {
    const response = await api.post<BackendTreeResponse>(
      `/trees/${treeId}/nodes`,
      {
        parentId,
        ...nodeData,
      }
    );
    return response.data.data;
  },

  /**
   * Update a node in a tree
   */
  updateNode: async (
    treeId: string,
    nodeId: string,
    nodeData: {
      label?: string;
      type?: 'trunk' | 'leaf';
    }
  ): Promise<KnowledgeTreeData> => {
    const response = await api.patch<BackendTreeResponse>(
      `/trees/${treeId}/nodes/${nodeId}`,
      nodeData
    );
    return response.data.data;
  },

  /**
   * Delete a node from a tree
   */
  deleteNode: async (treeId: string, nodeId: string): Promise<KnowledgeTreeData> => {
    const response = await api.delete<BackendTreeResponse>(
      `/trees/${treeId}/nodes/${nodeId}`
    );
    return response.data.data;
  },

  /**
   * Search trees by title or owner name
   */
  searchTrees: async (query: string): Promise<TreeListItem[]> => {
    const response = await api.get<TreeListItem[]>('/trees', {
      params: { search: query },
    });
    return response.data;
  },
};

