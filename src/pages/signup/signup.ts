import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';

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
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService : EstadoService,
    public clienteService : ClienteService,
    public alertCtrl: AlertController) {


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
    this.estadoService.findAll().subscribe(response =>{
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    },
    error => {});
  }

  signupUser(){
    this.clienteService.insert(this.formGroup.value).subscribe(
      response => {
        this.showInsertOk();
      },
      error => {}
    )
    
  }

  updateCidades(){
    let estadoId = this.formGroup.value.estadoId;
    this.cidadeService.findByEstado(estadoId)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error => {});
  }
  showInsertOk(){
    let alert = this.alertCtrl.create(
      {
        title:'Sucesso!',
        message: 'Cadastro efetuado com sucesso',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'OK',
            handler: () =>{
              this.navCtrl.pop();
            }
          }
        ]
      }
    );
    alert.present();
  }
}
