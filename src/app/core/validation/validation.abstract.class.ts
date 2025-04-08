import {FormGroup} from '@angular/forms';

export abstract class Validation {
  /**
   * Форма
   */
  public form: FormGroup;

  /**
   * Ошибки который придут с апи
   * @type {{}}
   */
  public validateErrors: any = {};

  /**
   * Если ли ошибки у поля формы
   *
   * @param {string} field
   * @returns {boolean | any}
   */
  getIsFieldValid(field: string) {
    return (!this.form.get(field).valid && this.form.get(field).touched)
      ||
      (this.validateErrors[field])
      ;
  }

  /**
   * Отдаем css класс для формы, если у поля есть ошибки
   *
   * @param {string} field
   * @returns {{form__row_error: boolean | any}}
   */
  getDisplayFieldCssClass(field: string) {
    return {
      'form__row_error': this.getIsFieldValid(field),
    };
  }

  /**
   * Проверяем определенный валидатор поля формы
   *
   * @param field
   * @param validatorName
   * @returns {boolean}
   */
  checkFieldValidator(field, validatorName) {
    return (!this.form.get(field).valid && this.form.get(field).touched) ? this.form.get(field).hasError(validatorName) : false;
  }
}

