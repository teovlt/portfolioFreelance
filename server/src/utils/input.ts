// Helpers for the public forms: every field is trimmed and capped
export const str = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
