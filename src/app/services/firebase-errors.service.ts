import { Injectable } from '@angular/core';
import {firebaseErrorsEnum} from "../utils/firebase-errors";

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorsService {

  constructor(

  ) { }

  firebaseError(code: string) {
    switch (code) {
      case firebaseErrorsEnum.EmailInUse:
        return 'El usuario ya existe';
      // case firebaseErrorsEnum.WeakPassword:
      //   return 'La contraseña es demasiado débil';
      case firebaseErrorsEnum.InvalidEmail:
        return 'Correo inválido';
      case firebaseErrorsEnum.WrongPassword:
        return 'Contraseña incorrecta';
      case firebaseErrorsEnum.UserNotFound:
        return 'El usuario no existe';
      case firebaseErrorsEnum.TooManyRequest:
        return 'Demasiados intentos fallidos, recupere la contraseña nuevamente';
      default:
        return 'Error desconocido';
    }
  }

}
