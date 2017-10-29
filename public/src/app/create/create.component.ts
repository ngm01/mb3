import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  current_user;
  question = {qtext: "", options: [["", 1], ["", 1], ["", 1], ["", 1]], user: ""}
  constructor(private _questionservice: QuestionService, private _userservice: UserService, private _router: Router) { }

  ngOnInit() {
    this._userservice.getCurrentUser().subscribe(
      res =>{if(res){this.current_user = res;}}
    )
  }

  onSubmit(){
    // for(let i=0; i<this.question.options.length; i++){
    //   this.question.options[i][1] = 1;
    // }
    console.log(this.question);
    this._questionservice.CreateQuestion(this.question).subscribe(
      res=>{
        console.log("Got a response at question creation.", res);
      },
      err =>{
        console.log("Angular/front-end error at question creation.", err)
      }
    );
    this.question = {qtext: "", options: [["", 1], ["", 1], ["", 1], ["", 1]], user: ""};
    this._router.navigateByUrl('/dashboard');
    
  }


}
