export interface CustomerinputsRegistrationTypes {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  errorMessage: string;
  pattern: string;
  required: boolean;
}

export interface CustomerInputsTypes {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  [key: string]: string;
}
