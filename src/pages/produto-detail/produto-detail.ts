import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';



@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item : ProdutoDTO;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public produtoService : ProdutoService,
              public cartService : CartService) {
  }

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id');
    this.produtoService.findById(produto_id)
    .subscribe(response=>{
      console.log(response);
      this.item = response;
      this.getImageUrlIfExists();
    },
    error=>{});
  }

  getImageUrlIfExists(){
    this.produtoService.getImageFromBucket(this.item.id)
    .subscribe(
      response =>{
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod/prod${this.item.id}.jpg`
      },
      error=>{console.log("Erro Imagem:"); console.log(error);});
  }

  addToCart(produto:ProdutoDTO){
    this.cartService.addProduto(produto);
    this.navCtrl.setRoot('CartPage');
  }

}
