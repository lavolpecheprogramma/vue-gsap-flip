// Deep merge utility function
export function deepMerge<T extends Record<string, any>> (target: T, source: Partial<T>): T {
  const result = { ...target } as T

  for (const key in source) {
    if (source[key] !== undefined) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = deepMerge((result[key] as Record<string, any>) || {}, source[key] as Record<string, any>) as T[Extract<keyof T, string>]
      } else {
        result[key] = source[key] as T[Extract<keyof T, string>]
      }
    }
  }

  return result
}
