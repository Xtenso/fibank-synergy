export function getInitials(
  name?: string | null,
  maxLength = 2,
  fallback = "U"
): string {
  if (!name) return fallback;

  return name
    .split(" ")
    .filter((part) => part.length > 0)
    .map((part) => part[0] || "")
    .join("")
    .substring(0, maxLength)
    .toUpperCase();
}
