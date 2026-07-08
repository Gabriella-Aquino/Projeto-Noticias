import { FormControl } from '@angular/forms';
import { strongPasswordValidator } from './strong-password-validator';

describe('strongPasswordValidator', () => {
  it('should return null for an empty value', () => {
    expect(strongPasswordValidator(new FormControl(''))).toBeNull();
  });

  it('should return null for a strong password', () => {
    expect(strongPasswordValidator(new FormControl('Senha@123'))).toBeNull();
  });

  it('should flag a password missing uppercase, number and special char', () => {
    const result = strongPasswordValidator(new FormControl('senha'));

    expect(result?.['strongPassword']).toEqual({
      minLength: true,
      uppercase: true,
      number: true,
      specialChar: true,
    });
  });
});
