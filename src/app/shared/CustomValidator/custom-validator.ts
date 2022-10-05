import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {any} from "codelyzer/util/function";

export class CustomValidator {

  // @ts-ignore
  static patternValidator(regex: RegExp, error:ValidationErrors): ValidatorFn {
    // @ts-ignore
    return (control: AbstractControl): {[key: string]: any} => {
      if (!control.value){
        return null;
      }

      const valid = regex.test(control.value);

      return valid ? null : error;
    };
  }

  static mustMatch(control: AbstractControl){
    const password: string = control.get('password').value;
    const repeatPassword: string = control.get('repeatPassword').value;

    if (password !== repeatPassword){
      control.get('repeatPassword').setErrors({mustMatch: true});
    }

  }


}
