import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const strongPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value: string = control.value ?? '';

  if (!value) {
    return null;
  }

  const errors: ValidationErrors = {};

  if (value.length < 8) {
    errors['minLength'] = true;
  }
  if (!/[a-z]/.test(value)) {
    errors['lowercase'] = true;
  }
  if (!/[A-Z]/.test(value)) {
    errors['uppercase'] = true;
  }
  if (!/[0-9]/.test(value)) {
    errors['number'] = true;
  }
  if (!/[^A-Za-z0-9]/.test(value)) {
    errors['specialChar'] = true;
  }

  return Object.keys(errors).length > 0 ? { strongPassword: errors } : null;
};
