export function StringToArray(str: string): any[] {
  if (!str) return undefined
  return str
    .slice(1, -1)
    .split(',')
    .map((item) => item.trim())
}
