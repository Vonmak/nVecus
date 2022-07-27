import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {

  isAuthenticated:boolean = false;
  private userSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub= this.authService.isLoggedin.subscribe((user) =>{
      console.log(user);
      this.isAuthenticated=!user? false : true;
      console.log(this.isAuthenticated);
    })
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
}
onLogout(){
  this.authService.logout();
}

}
