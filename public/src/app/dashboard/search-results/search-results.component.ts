import { Component, OnInit, Input } from '@angular/core';
import { NgSwitch } from '@angular/common';
import { QuestionService } from '../../question.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  @Input() query;
  @Input() current_user;
  results = [];
  constructor(private _questionservice: QuestionService, private _router: Router) { }

  ngOnInit() {
    this.showAll();
  }

  resultify(q){
    var searchResults = [];
    for(let i=0; i<this.results.length;i++){
      if(this.results[i].qtext.toLowerCase().includes(q.toLowerCase())){
        searchResults.push(this.results[i]);
      }
    }
    return searchResults;
  }

showAll(){
    this._questionservice.ShowAllQuestions().subscribe(
      res =>{
        this.results = res.questions;
      }
    )
  }

  Delete(id){
    this._questionservice.DeleteQuestion(id);
    this._router.navigateByUrl('/')
  }
}
