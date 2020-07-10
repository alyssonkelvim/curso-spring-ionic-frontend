import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {email: "", senha:""};
  constructor(public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService
    ) {

  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  login(){
    this.auth.authenticate(this.creds).subscribe(
      response => {
        this.auth.successfullLogin(response.headers.get("Authorization"));
        console.log("Autorizado");
        this.navCtrl.setRoot('CategoriasPage');
        console.log("Não foi");
      },
      error => (console.log(error))
    );
  
  }

}
