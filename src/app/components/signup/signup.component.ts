import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  phonepattern = "^((\\+91-?)|0)?[0-9]{10}$"; 

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(formData: NgForm): void {
    this.authService.signupUser(formData.value).subscribe((data) => {
      this.router.navigate(['/']);
    })
  }
}
