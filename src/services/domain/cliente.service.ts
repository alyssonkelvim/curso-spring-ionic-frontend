import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { HttpHeaders,HttpClient } from "@angular/common/http";

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, 
        public storage: StorageService){

    }

    findByEmail(email:string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImageFromBucket(id: string) : Observable<any>  {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
        console.log(url);
        return this.http.get(url,{responseType : 'blob'});
    }

    insert(obj : ClienteDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}