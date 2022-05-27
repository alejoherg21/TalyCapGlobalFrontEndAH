import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginI } from '../Models/login.interface';
import { AuthService } from '../Services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  login: loginI | undefined;

  constructor(private fb: FormBuilder, private Api: AuthService, private router: Router)  {

    this.form = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }
  ngOnInit(): void {
  }

  errorStatus:boolean = false;
  errorMsj: any = "";

  LoginUsuario(){
    console.log(this.form)

    this.login = {
      UserName: this.form.get('userName')?.value,
      Password: this.form.get('password')?.value
    }

    //this.toastr.success('Registo exitoso');
    //this.form.reset();
    this.Login(this.login)
  }

  Login (login: loginI){
    console.log(login)
    this.Api.login(login).subscribe (data =>{
      console.log(data)
         if (data.message !== "Success") {
          this.errorStatus = true;
          this.errorMsj= data.message
      }
       else{
        // salta a l componente
        localStorage.setItem('token',data.token)
        this.router.navigate(['/RefreshTables']);
      }
    })
  }
}
