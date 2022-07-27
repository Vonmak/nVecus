import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @Input() profile: any;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getCustomer().subscribe((customer) => {
      console.log(customer);
      this.profile= customer;
      console.log(this.profile);
      
    })
  }

}
