import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { QuestionService } from '../question.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  current_user;
  questions= [];
  search = {query: "", results: []};

  constructor(private _userservice: UserService, private _router: Router, private _questionservice: QuestionService) { }

  ngOnInit() {
    this.search = {query: "", results: []};
    this._userservice.getCurrentUser().subscribe(
     res =>{
       if (res){
        this.current_user = res;
       }
     }
    );

    this.resetSearch();
  }

  LogOut(){
    this._userservice.LogOut();
  }

  Create(){
    this._router.navigateByUrl('create')
  }

  Delete(id){
    this._questionservice.DeleteQuestion(id);
    this._router.navigateByUrl('/')
  }

  onSearch(){
    this.search.results = [];
    this._questionservice.Search(this.search).subscribe(
    (res)=>{
      this.search.results = this.search.results.concat(res.json().results);
      for(let i=0; i<this.search.results.length; i++){
        for(let k=i+1;k<this.search.results.length; k++){
          if(this.search.results[i] === this.search.results[k]){
            this.search.results.splice(k--, 1);
          }
        }
      }
      this.questions = this.search.results;
    })
  }

  resetSearch(){
    this._questionservice.ShowAllQuestions().subscribe(
      res =>{
        this.questions = res.questions;
        this.search = {query: "", results: []};
      }
    )
  }
}
