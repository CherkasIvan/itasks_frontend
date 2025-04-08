import {Component, OnChanges, Input, SimpleChange} from '@angular/core';

@Component({
  selector: 'ux-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.less']
})
export class PasswordStrengthComponent implements OnChanges {

  @Input() passwordToCheck: string;
  bar0: string;
  bar1: string;
  bar2: string;
  bar3: string;
  label: string;
  private colors: Array<string> = ['#F00', '#F90', '#4be5d7', '#29beb0'];

  constructor() {
  }

  private measureStrength(p: string) {
    let _force = 0;
    const _regex = /[$-/:-?{-~!"^_`\[\]]/g; // "
    const _lowerLetters = /[a-z]+/.test(p);
    const _upperLetters = /[A-Z]+/.test(p);
    const _numbers = /[0-9]+/.test(p);
    const _symbols = _regex.test(p);

    const _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];

    let _passedMatches = 0;
    for (const _flag of _flags) {
      _passedMatches += _flag === true ? 1 : 0;
    }

    _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
    _force += _passedMatches * 10;
    _force = (p.length <= 6) ? Math.min(_force, 10) : _force;
    _force = (_passedMatches === 1) ? Math.min(_force, 10) : _force;
    _force = (_passedMatches === 2) ? Math.min(_force, 20) : _force;
    _force = (_passedMatches === 3) ? Math.min(_force, 40) : _force;

    return _force;
  }

  private getIndicator(s: number) {
    let idx = 0;
    let label = 'Пароль слишком слабый';
    if (s <= 10) {
      idx = 0;
    } else if (s <= 20) {
      idx = 1;
      label = 'Стоит добавить символы, цифры и буквы разного регистра';
    } else if (s <= 40) {
      label = 'Довольно надежный';
      idx = 2;
    } else {
      label = 'Отличный пароль';
      idx = 3;
    }
    return {
      idx: idx + 1,
      color: this.colors[idx],
      label: label
    };
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes['passwordToCheck'].currentValue;

    if (password) {
      for (let _n = 0; _n < 5; _n++) {
        this['bar' + _n] = '#dfe3e9';
      }
      const passwordIndex = this.measureStrength(password);
      const indicator = this.getIndicator(passwordIndex);
      this.label = indicator.label;
      for (let _n = 0; _n < indicator.idx; _n++) {
        this['bar' + _n] = indicator.color;
      }
    }
  }
}
