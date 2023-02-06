import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  managers: any = []
  manager: User = new User()
  confirmPassword: string = null

  //Flags required to render in UI
  isPasswordMismatch: boolean = false
  isAdded: boolean = false
  isUpdated: boolean = false

  constructor(public router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getManagers().subscribe(
      res => {
        this.managers = res
      }
    )
  }

  addManager() {
    if (this.manager.password !== this.confirmPassword)
      this.isPasswordMismatch = true
    else {
      this.auth.addManager(this.manager).subscribe(
        res => {
          this.isAdded = true
        }
      )
    }
  }

  updateManager() {
    this.auth.updateManager(this.manager).subscribe(
      res => {
        this.isUpdated = true
      }
    )
  }

  deleteManager(userId: number) {
    this.auth.deleteManager(userId).subscribe(
      res => {
        this.ngOnInit()
      }
    )

  }
}
