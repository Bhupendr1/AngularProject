import { Component ,OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductserviceService } from '../service/productservice.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-neweletter',
  templateUrl: './neweletter.component.html',
  styleUrls: ['./neweletter.component.scss'],
  providers: [MessageService,ConfirmationService] 

})
export class NeweletterComponent {
  submitted = false;
  showMsg: boolean = false;
  Hidediv: boolean = true;
  subscription!: Subscription;
  messages: any[] = [];
  reactiveForm!:FormGroup;
constructor(
  private formBuilder:FormBuilder,
  private _Api:ProductserviceService,
 private messageService: MessageService,){

}
ngOnInit(): void {
  this.reactiveForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
}

get email() {
  return this.reactiveForm.get('email')!;
}
onSubmit(): void {
  this.submitted = true;
  if (this.reactiveForm.invalid) {
    return;
  }
  this.showMsg= true;
  this.Hidediv=false;
}

onReset(): void {
  this.submitted = false;
  this.reactiveForm.reset();
}
}