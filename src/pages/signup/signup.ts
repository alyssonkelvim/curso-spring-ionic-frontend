import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {
      this.formGroup = formBuilder.group({
        nome: ['Alysson', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['alysson@gmail.com', [Validators.required, Validators.email]],
        tipo: ['1', [Validators.required]],
        cpfOuCnpj : ['08247232600', [Validators.required, Validators.minLength(11)]],
        senha : ['123', [Validators.required]],
        logradouro : ['Rua Viva', [Validators.required]],
        numero : ['25', [Validators.required]],
        complemento : ['Apto 3', []],
        bairro : ['Copacabana', []],
        cep : ['35164268', [Validators.required]],
        telefone1 : ['985267956', [Validators.required]],
        telefone2: ['', []],
        telefone3: ['', []],
        estadoId : [null, Validators.required],
        cidadeId : [null, [Validators.required]]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signupUser(){
    console.log("Enviou o Form");
  }

  updateCidades(){

  }

}
