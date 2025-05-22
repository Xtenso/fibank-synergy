import { useTranslations } from "next-intl";

export function useRoleName() {
  const tRole = useTranslations("roles");

  return (roleCode: string) => {
    switch (roleCode) {
      case "admin":
        return tRole("admin");
      case "company":
        return tRole("company");
      case "user":
      default:
        return tRole("user");
    }
  };
}
