import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionService {

  constructor(private _http: Http, private _router: Router) { }

  CreateQuestion(question){
    return this._http.post('/createQuestion', question);
  };

  ShowOneQuestion(id){
    return this._http.get("/showOneQuestion/" + id).map((response) => response.json());;
  };

  ShowAllQuestions(){
    return this._http.get('/showAllQuestions').map((response) => response.json());
  };

  DeleteQuestion(id){
    return this._http.delete('/deleteQuestion/' + id).subscribe(res=>{this._router.navigateByUrl('/dashboard/my-list');}, err=>{console.log("services error:", err)});
  };

  Search(search){
    return this._http.post('/questions/search', search);
  }

  UpdateQuestion(question){
    return this._http.post('/updateQuestion', question);
  }


}

