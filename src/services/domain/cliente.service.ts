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

    findByEmail(email:string) : Observable<ClienteDTO>{
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer '+token});
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`, {'headers': authHeader});
    }

    getImageFromBucket(id: string) : Observable<any>  {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
        console.log(url);
        return this.http.get(url,{responseType : 'blob'});
    }
}