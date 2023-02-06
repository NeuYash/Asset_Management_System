import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string = null
  password: string = null
  userType: string = null

  users: any = []
  loginSucc: boolean = true
  isLogginIn: boolean = false
  isInvalidAttempt: boolean = false
  inputType: string = "password"
  errMsg: string = "Please check your inputs.."

  constructor(private as: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      args => {
        if(args.get('redirect'))
          this.isInvalidAttempt = true
      }
    )
  }

  //For view password
  toggle() {
    if (this.inputType == "password")
      this.inputType = "text"
    else
      this.inputType = "password"
  }

  //On submit
  onSubmit(form: NgForm) {
    this.isLogginIn = true
    if (form.valid) {
      let user = new User()
      user.userName = this.userName
      user.password = this.password
      this.as.login(user).subscribe(
        res => {
          if (res == null)
            this.loginSucc = false
          this.isLogginIn = false
          if (res.userType == "admin") {
            localStorage.setItem('userType', window.btoa("admin"))
            this.router.navigate(['admin/dashboard'])
          }
          else if (res.userType == "manager") {
            localStorage.setItem('userName', window.btoa(res.userName))
            localStorage.setItem('userType', window.btoa("manager"))
            this.router.navigate(['manager/dashboard'])
          }
        }
      )
    }
  }
}
