import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  question;
  constructor(private _activedroute: ActivatedRoute, private _questionservice: QuestionService) {
    
   }


  ngOnInit() {
    this._activedroute.paramMap.subscribe(
      param =>{
        this._questionservice.ShowOneQuestion(param.get('id')).subscribe(
        res =>{
          this.question = res.question[0];
        }
      );}
    )
  }

  Vote(idx){
    this.question.options[idx][1] += 1;
    this._questionservice.UpdateQuestion(this.question).subscribe(
      res=>{
        console.log("Got a response from server updating question.");
      },
      err =>{
        console.log("Frontend error attempting to update question.", err);
      }
    )
  }

}
