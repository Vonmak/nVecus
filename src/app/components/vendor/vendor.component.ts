import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  @Input() profile: any;

  constructor(private router: Router, private profileService:ProfileService, private authService: AuthService) { }

  ngOnInit(): void {
    this.profileService.getVendor().subscribe((vendor) => {
      console.log(vendor);
      this.profile= vendor
      console.log(this.profile)
    })
  }

  // onSubmit(){
  //   console.log(this.updateForm)
  //   const form = this.updateForm.value

  //   this.profileService.upDate(form).subscribe(data => {
  //     console.log(data)
  //     this.router.navigate(['/home']);
  //   });
  
  // }
}
