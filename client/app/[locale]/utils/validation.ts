type ValidationResult = string | true;
type GetTranslationFn = (key: string) => string;

export interface FormField {
  value: string;
  confirmValue?: string;
  touched?: boolean;
}

export function createValidator(
  field: string,
  formData: Record<string, string>,
  translate: GetTranslationFn,
  translateUser?: GetTranslationFn
) {
  return (value: string) => {
    if (field === "confirmPassword") {
      return validateConfirmPassword(value, formData.password, translate);
    }

    const result = validateField(
      field,
      { ...formData, [field]: value },
      translate,
      translateUser || translate
    );
    return result;
  };
}

export const validateUin = (
  uin: string,
  translate: GetTranslationFn
): ValidationResult => {
  if (!uin) {
    return translate("errors.uinRequired");
  } else if (uin.length !== 10) {
    return translate("errors.uinLength");
  } else if (!/^[0-9]+$/.test(uin)) {
    return translate("errors.uinFormat");
  }
  return true;
};

export const validateNameCyrillic = (
  name: string,
  translate: GetTranslationFn
): ValidationResult => {
  if (!name) {
    return translate("errors.nameCyrillicRequired");
  } else if (!/^[\u0400-\u04FF\s-]+$/.test(name)) {
    return translate("errors.nameCyrillicFormat");
  } else if (name.trim().split(/\s+/).length < 2) {
    return translate("errors.nameFullRequired");
  } else if (
    name
      .trim()
      .split(/\s+/)
      .some((part) => part.length < 3)
  ) {
    return translate("errors.namePartLength");
  }
  return true;
};

export const validateNameLatin = (
  name: string,
  translate: GetTranslationFn
): ValidationResult => {
  if (!name) {
    return translate("errors.nameLatinRequired");
  } else if (!/^[A-Za-z\s-]+$/.test(name)) {
    return translate("errors.nameLatinFormat");
  } else if (name.trim().split(/\s+/).length < 2) {
    return translate("errors.nameFullRequired");
  } else if (
    name
      .trim()
      .split(/\s+/)
      .some((part) => part.length < 3)
  ) {
    return translate("errors.namePartLength");
  }
  return true;
};

export const validatePhoneNumber = (
  phone: string,
  translate: GetTranslationFn
): ValidationResult => {
  if (!phone) {
    return translate("errors.phoneRequired");
  } else if (phone.length < 10) {
    return translate("errors.phoneLength");
  } else if (!/^\+?[0-9\s-]+$/.test(phone)) {
    return translate("errors.phoneFormat");
  }
  return true;
};

export const validateAddress = (
  address: string,
  translate: GetTranslationFn
): ValidationResult => {
  if (!address) {
    return translate("errors.addressRequired");
  } else if (address.length < 10) {
    return translate("errors.addressLength");
  }
  return true;
};

export const validateUsername = (
  username: string,
  translate: GetTranslationFn
): ValidationResult => {
  if (!username) {
    return translate("errors.usernameRequired");
  } else if (username.length < 5) {
    return translate("errors.usernameMinLength");
  } else if (!/^[a-zA-Z_-]+$/.test(username)) {
    return translate("errors.usernameFormat");
  }
  return true;
};

export const validateEmail = (
  email: string,
  translate: GetTranslationFn
): ValidationResult => {
  if (!email) {
    return translate("errors.emailRequired");
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    return translate("errors.emailInvalid");
  }
  return true;
};

export const validatePassword = (
  password: string,
  translate: GetTranslationFn
): ValidationResult => {
  if (!password) {
    return translate("errors.passwordRequired");
  } else if (password.length < 6) {
    return translate("errors.passwordLength");
  } else if (password.length > 24) {
    return translate("errors.passwordMaxLength");
  } else if (!/[a-zA-Z]/.test(password)) {
    return translate("errors.passwordLetter");
  } else if (!/[0-9]/.test(password)) {
    return translate("errors.passwordNumber");
  } else if (
    !/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(password)
  ) {
    return translate("errors.passwordFormat");
  }
  return true;
};

export const validateConfirmPassword = (
  confirmPassword: string,
  password: string,
  translate: GetTranslationFn
): ValidationResult => {
  if (!confirmPassword) {
    return translate("errors.confirmPasswordRequired");
  } else if (confirmPassword !== password) {
    return translate("errors.passwordsDoNotMatch");
  }
  return true;
};

export const validateField = (
  field: string,
  formData: Record<string, string>,
  translate: GetTranslationFn,
  translateUser: GetTranslationFn
): ValidationResult => {
  switch (field) {
    case "uin":
      return validateUin(formData.uin, translateUser);
    case "nameCyrillic":
      return validateNameCyrillic(formData.nameCyrillic, translateUser);
    case "nameLatin":
      return validateNameLatin(formData.nameLatin, translateUser);
    case "phoneNumber":
      return validatePhoneNumber(formData.phoneNumber, translateUser);
    case "address":
      return validateAddress(formData.address, translateUser);
    case "username":
      return validateUsername(formData.username, translate);
    case "email":
      return validateEmail(formData.email, translateUser);
    case "password":
      return validatePassword(formData.password, translate);
    case "confirmPassword":
      return validateConfirmPassword(
        formData.confirmPassword,
        formData.password,
        translate
      );
    default:
      return true;
  }
};
