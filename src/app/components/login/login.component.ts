import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(formData: any){
    this.authService.login(formData).subscribe((data) => {
      console.log(data);
      if (data.roles === 'vendor') {
        // this.authService.getProfile().subscribe((profile) => {
       //   this.router.navigate([`/home/`]);
       // });
       this.router.navigate([`/vendor/`]);
     }
     else if (data.roles === 'customer') {
        // this.authService.getProfile().subscribe((profile) => {
       //   this.router.navigate([`/home/`]);
       // });
       this.router.navigate([`/customer/`]);
     }
     else{
      this.router.navigate([`/signup/`]);
     //  this.error=errorRes;
     }
    })
  }
}
