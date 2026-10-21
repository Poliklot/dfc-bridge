export interface HandoffNode {
  id: string; type: string; name: string; parentId: string | null;
  children: string[]; supportsChildren: boolean; mainComponentId: string | null; figmaPageId: string | null;
  identity: string; tags: Record<string, (string | true)[]>; native: Record<string, unknown>;
}
export interface HandoffSnapshot {
  format: 'dfc-bridge-handoff'; schemaVersion: 1 | 2; revision: string;
  generator: { pluginVersion: string; validatorVersion: string };
  source: { fileKey: string | null; figmaPageId: string; figmaPageName: string };
  scope: { kind: 'page' | 'section'; completeness: 'full' | 'partial'; rootIds: string[]; pageId: string };
  nodes: HandoffNode[]; dependencies: HandoffNode[];
  componentInspection?: { instances: { node: InspectedNode; mainComponentId: string | null; familyId: string | null }[]; families: {
    id: string; name: string; key: string | null;
    remote: boolean | null; sourceFileKey: string | null; figmaPageId: string | null;
    propertyDefinitions: Record<string, unknown> | null; axes: Record<string, unknown> | null;
    variants: { id: string; name: string; properties: Record<string, string> | null;
      nodes: InspectedNode[] }[];
  }[] };
  preflight: {
    mode: 'page' | 'section'; scope: 'page' | 'selection'; status: 'ready' | 'review' | 'not-ready' | 'partial' | 'blocked';
    issues: { ruleId: string; severity: 'error' | 'warning' | 'todo'; nodeId: string; message?: string }[];
    summary: Record<string, unknown>;
  };
  coverage: {
    instanceInteriors: 'atomic'; content: 'not-checked'; runtime: 'not-checked'; componentVariants: 'not-exported' | 'inspected';
    unavailable: { nodeId: string; field: string; reason: string }[];
  };
}
export interface InspectedNode {
  id: string; path: string; type: string; name: string; native: Record<string, unknown>;
  styles: Record<string, unknown>[]; variables: Record<string, unknown>[];
}
export const MAX_HANDOFF_BYTES: number;
export function canonicalHandoffJSON(value: unknown): string;
export function validateHandoff(input: unknown): HandoffSnapshot;
export function handoffRevision(input: HandoffSnapshot): Promise<string>;
export function sealHandoff(input: unknown): Promise<HandoffSnapshot>;
export function parseHandoff(text: string): Promise<HandoffSnapshot>;
