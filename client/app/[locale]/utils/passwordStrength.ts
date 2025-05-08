import { useTranslations } from "next-intl";

export const calculatePasswordStrength = (
  password: string,
  getTranslation: (key: string) => string
): {
  score: number;
  label: string;
  color: "default" | "danger" | "warning" | "success" | "primary";
} => {
  // Start with a score of 0
  let score = 0;

  // If no password, return 0
  if (!password) {
    return { score: 0, label: "", color: "default" };
  }

  // Length
  if (password.length >= 12) {
    score += 25;
  } else if (password.length >= 8) {
    score += 15;
  } else if (password.length >= 6) {
    score += 10;
  }

  // Complexity
  if (/[A-Z]/.test(password)) score += 15; // Has uppercase
  if (/[a-z]/.test(password)) score += 15; // Has lowercase
  if (/[0-9]/.test(password)) score += 15; // Has number
  if (/[^A-Za-z0-9]/.test(password)) score += 20; // Has special char

  // Bonus points for variety
  const types = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((regex) =>
    regex.test(password)
  ).length;
  score += (types - 1) * 5;

  // Max score 100
  score = Math.min(100, score);

  // Label and color based on score
  let label;
  let color: "default" | "danger" | "warning" | "success" | "primary";

  if (score < 30) {
    label = getTranslation("passwordStrength.veryWeak");
    color = "danger";
  } else if (score < 50) {
    label = getTranslation("passwordStrength.weak");
    color = "danger";
  } else if (score < 70) {
    label = getTranslation("passwordStrength.moderate");
    color = "warning";
  } else if (score < 90) {
    label = getTranslation("passwordStrength.strong");
    color = "success";
  } else {
    label = getTranslation("passwordStrength.veryStrong");
    color = "success";
  }

  return { score, label, color };
};
