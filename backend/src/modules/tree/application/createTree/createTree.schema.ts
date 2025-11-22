import { z, ZodTypeAny } from 'zod';

const NodeType = z.enum(['pot', 'trunk', 'leaf']);

const KnowledgeTreeNodeSchema: ZodTypeAny = z.lazy(() =>
  z.object({
    id: z.string(),
    label: z.string(),
    type: NodeType,
    level: z.number(),
    children: z.array(KnowledgeTreeNodeSchema).optional(),
  }),
);

const KnowledgeTreeMetadataSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  createdAt: z.string(),
});

export const KnowledgeTreeDataSchema = z.object({
  metadata: KnowledgeTreeMetadataSchema,
  root: KnowledgeTreeNodeSchema,
});
