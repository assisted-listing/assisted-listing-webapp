import { Component, OnInit } from '@angular/core';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { NgForm } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlBackendService } from 'src/app/services/al-backend.service';

interface formDataInterface {

  "email": string;
  [key: string]: string;
};

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  isLoading: boolean = false;
  fname: string = '';
  lname: string = '';

  email: string = '';
  mobileNo: string = '+1';

  username: string = '';
  password: string = '';
  redirect: string[];

  constructor(private router: Router, private alService: AlBackendService) { 
    const currentNav = this.router.getCurrentNavigation()
    console.log('sign-up')
    console.log(currentNav)
    const state = currentNav?.extras.state as {
      redirect: string[]
    }; 

    if (state && 'redirect' in state){
      this.redirect = state.redirect
      console.log('redirect received')
    }
  }

  ngOnInit(): void { 
    
  }

  onSignup(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      var poolData = {
        UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
        ClientId: environment.cognitoAppClientId // Your client id here
      };
      var userPool = new CognitoUserPool(poolData);
      var attributeList = [];
      let formData: formDataInterface = {
        
        "email": this.email,
      }

      for (let key in formData) {
        let attrData = {
          Name: key,
          Value: formData[key]
        }
        let attribute = new CognitoUserAttribute(attrData);
        attributeList.push(attribute)
      }
      userPool.signUp(this.username, this.password, attributeList, [], (
        err,
        result
      ) => {
        this.isLoading = false;
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        console.log(result)
        //invoke dynamo user create
          alert('User created succesfully. Check email for verification link')

          const navigationExtras: NavigationExtras = {
      state: {
        redirect: this.redirect,
      }
    }
    this.router.navigate(['\login'], navigationExtras)

      });
    }
  }
}