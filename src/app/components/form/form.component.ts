import {Component, OnInit, Output,EventEmitter} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmedValidator} from "../../validators/confirmed-validator";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  numbers = [1,2,3,4,5,6,7,8,9,10]
  constructor(private fb: FormBuilder) {
  }
  registrationForm!: FormGroup;
  ngOnInit() {

  this.registrationForm = this.fb.group({
    form: this.fb.array([
      this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: [''],
        email: ['',[Validators.required, Validators.email]],
        number: [''],
        passwordGroup: this.fb.group({
          password: ['',[Validators.required,Validators.minLength(6)]],
          confirmPassword: ['', Validators.required]
        }, {
          validator: ConfirmedValidator('password', 'confirmPassword')
        })
        })
      ])
  })
}

 get firstName() {
    return this.registrationForm.get('firstName')
}
  get f(){
     return this._form.controls;
   }

  get _form() {
    return this.registrationForm.get('form') as FormArray;
  }
  get password() {
    return this._form.get('password');
  }
  get confirmPassword() {
    return this._form.get('confirmPassword') ;
  }

  addForm() {
    this._form.push(this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      number: [''],
      passwordGroup: this.fb.group({
        password: [''],
        confirmPassword: ['']
      })
  }))
}

  deleteForm(index: any) {
    // console.log(index);
    this._form.removeAt(index);
  }

  onSubmit() {
    this._form.value.forEach((item:{}, index:number)=>{
      if (index < 10){
        console.log(item);
        console.log(index);
      }
    })
  }
}
