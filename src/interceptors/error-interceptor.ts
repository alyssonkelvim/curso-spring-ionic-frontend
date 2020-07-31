import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";
import { FieldMessage } from "../models/fieldmessage";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public storage: StorageService, public alertCtrl: AlertController){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req)
        .catch((error, caught)=> {
            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo Interceptor");
            console.log(errorObj);

            switch(errorObj.status){
                case 403:
                    this.handle403();
                    break;
                case 401:
                    this.handle401();
                    break;
                case 400:
                    this.handle422(errorObj);
                    break;
                default:
                    this.handleDefaultError(errorObj);
                    break;
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    handle422(errorObj){
        console.log('veio');

        let alert = this.alertCtrl.create({
            title: 'Erro 422 - Erro de Validação',
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        alert.present();
    }

    listErrors(messages : FieldMessage[]) : string{
        let s : string = '';
        for(var i=0; i<messages.length; i++){
            s = s + '<p><strong>' + messages[i].fieldName + '</strong>: ' + messages[i].message + '</p>';
        }
        return s;
    }

    handle403(){
        this.storage.setLocalUser(null);
    }
    handle401(){
        let alert = this.alertCtrl.create({
            title: 'Erro 401: Falha de Autenticação',
            message: 'E-mail ou senha incorretos.',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        alert.present();
    }

    handleDefaultError(errorObj){
        let alert = this.alertCtrl.create({
            title: `Erro ${errorObj.status}: ${errorObj.error}`,
            message: `${errorObj.message}`,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};