export interface HandoffNode {
  id: string; type: string; name: string; parentId: string | null;
  children: string[]; supportsChildren: boolean; mainComponentId: string | null; figmaPageId: string | null;
  identity: string; tags: Record<string, (string | true)[]>; native: Record<string, unknown>;
}
export interface HandoffSnapshot {
  format: 'dfc-bridge-handoff'; schemaVersion: 1; revision: string;
  generator: { pluginVersion: string; validatorVersion: string };
  source: { fileKey: string | null; figmaPageId: string; figmaPageName: string };
  scope: { kind: 'page' | 'section'; completeness: 'full' | 'partial'; rootIds: string[]; pageId: string };
  nodes: HandoffNode[]; dependencies: HandoffNode[];
  preflight: {
    mode: 'page' | 'section'; scope: 'page' | 'selection'; status: 'ready' | 'review' | 'not-ready' | 'partial' | 'blocked';
    issues: { ruleId: string; severity: 'error' | 'warning' | 'todo'; nodeId: string; message?: string }[];
    summary: Record<string, unknown>;
  };
  coverage: {
    instanceInteriors: 'atomic'; content: 'not-checked'; runtime: 'not-checked'; componentVariants: 'not-exported';
    unavailable: { nodeId: string; field: string; reason: string }[];
  };
}
export const MAX_HANDOFF_BYTES: number;
export function canonicalHandoffJSON(value: unknown): string;
export function validateHandoff(input: unknown): HandoffSnapshot;
export function handoffRevision(input: HandoffSnapshot): Promise<string>;
export function sealHandoff(input: unknown): Promise<HandoffSnapshot>;
export function parseHandoff(text: string): Promise<HandoffSnapshot>;
