export const VDWTypes = ["single", "double"] as const;
export type VDWType = typeof VDWTypes[number];

export const VDWConnectionStructures = ["steel", "concrete"] as const;
export type VDWConnectionStructure = typeof VDWConnectionStructures[number];

