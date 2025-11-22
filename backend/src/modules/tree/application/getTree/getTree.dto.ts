export interface TreeResponseDto {
  id: string;
  ownerId: string;
  title: string;
  bucket_url: string;
  treeData: any;
  createdAt: Date;
  updatedAt: Date;
  owner: {
    id: string;
    name: string | null;
    email: string;
  } | null;
}

interface TreeWithOwner {
  id: number;
  ownerId: number;
  title: string;
  bucket_url: string;
  createdAt: Date;
  updatedAt: Date;
  owner: {
    id: number;
    name: string | null;
    email: string;
  } | null;
}

interface TreeWithOwnerAndData extends TreeWithOwner {
  treeData: any;
}

export function toDto(tree: TreeWithOwnerAndData): TreeResponseDto {
  return {
    id: tree.id.toString(),
    ownerId: tree.ownerId.toString(),
    title: tree.title,
    bucket_url: tree.bucket_url,
    treeData: tree.treeData,
    createdAt: tree.createdAt,
    updatedAt: tree.updatedAt,
    owner: tree.owner
      ? {
          id: tree.owner.id.toString(),
          name: tree.owner.name,
          email: tree.owner.email,
        }
      : null,
  };
}
