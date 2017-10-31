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
  search = {query: ""};



  constructor(private _userservice: UserService, private _router: Router, private _questionservice: QuestionService) { }

  ngOnInit() {
    this._userservice.getCurrentUser().subscribe(
     res =>{
       if (res){
        this.current_user = res;
       }
     }
    );
  
  }

  LogOut(){
    this._userservice.LogOut();
  }

  Create(){
    this._router.navigateByUrl('create')
  }

}
