import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateNotInFuture(): ValidatorFn {
  return (dateUser: AbstractControl): ValidationErrors | null => {
    const currentDate = new Date();
    const selectedDate = new Date(dateUser.value);

    if (selectedDate > currentDate) {
      return { dateInFuture: 'A data não pode ser maior que a data atual' };
    }

    return null;
  };
}

export function dateNotBeforeReleaseDate(releaseDate: string): ValidatorFn {
  return (dateUser: AbstractControl): ValidationErrors | null => {
    const selectedDate = new Date(dateUser.value);
    const releaseDateObj = new Date(releaseDate);

    if (selectedDate < releaseDateObj) {
      return {
        dateBeforeRelease:
          'A data não pode ser anterior à data de lançamento do filme',
      };
    }
    return null;
  };
}
