import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/User';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo = 'Login';
  model: any = {};
  constructor(
      private toastr: ToastrService
    , private authService: AuthService
    , public router: Router) {

  }

  ngOnInit() {
    if(localStorage.getItem('token') != null){
      this.router.navigate(['/dashboard']);
    }
  }

  login()
  {
    this.authService.login(this.model)
    .subscribe(
      () => {
        this.router.navigate(['/dashboard']);
        this.toastr.success('Logado');
      },
      error => {
        this.toastr.error('Falha ao logar');
      }
    )
  }

}
