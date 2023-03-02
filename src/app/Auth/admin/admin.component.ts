import { Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ProductserviceService } from 'src/app/service/productservice.service';
export interface User {
  userName: string;
  password: string;
 }
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  registerForm:any=FormGroup;

  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private _Api:ProductserviceService,
    private authService:AuthService
    )
   {}

  ngOnInit() {
    //Add User form validations
    this.registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
    });
  }
  get f() {
    return this.registerForm.controls;
}

onSubmit() {
  
  this.submitted = true;
  // stop here if form is invalid
  if (this.registerForm.invalid) {
      return;
  }
  //True if all the fields are filled
 else
  {

    alert("Great!!");
    this.authService.login();
    this.router.navigateByUrl('/Admin/Dashboard')
  }
 
}

    }
