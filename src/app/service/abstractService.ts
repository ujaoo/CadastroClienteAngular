import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/environment';

export abstract class AbstractService {

    protected webContext:string = '';

    constructor(protected http:HttpClient){ }

    public abstract getPath():string;

    public getUrl(pathEnd?:string):string{
        if (pathEnd != null){
            return environment.url +this.getPath()+"/"+pathEnd;
        }
        return environment.url +this.getPath();
    }

}