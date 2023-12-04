import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  constructor(private router: Router) { 
    const currentNav = this.router.getCurrentNavigation()
    console.log('sign-in')
    console.log(currentNav)
    const navState = currentNav?.extras.state as {
      redirect: string[]
    };
    console.log(navState)

    if (navState && 'redirect' in navState) {
      console.log('received redirect')
      this.redirects = navState.redirect
    }
  }

  isLoading: boolean = false;
  email_address: string = "";
  password: string = "";
  redirects: string[]


  ngOnInit(): void { 
    }

  signUp(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        redirect: this.redirects
      }
    }
    this.router.navigate(['register'], navigationExtras)
  }

  onSignIn(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      let authenticationDetails = new AuthenticationDetails({
        Username: this.email_address,
        Password: this.password,
      });
      let poolData = {
        UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
        ClientId: environment.cognitoAppClientId // Your client id here
      };

      let userPool = new CognitoUserPool(poolData);
      let userData = { Username: this.email_address, Pool: userPool };
      var cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          alert('Sign in succesful')
          this.navigateToLastRedirect()
        },
        onFailure: (err) => {
          alert(err.message || JSON.stringify(err));
          this.isLoading = false;
        },
        newPasswordRequired: function (userAttributes, requiredAttributes) {
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.
          alert('Check email for verification link.')


          // the api doesn't accept this field back
        }
      });
    }
  }

  navigateToLastRedirect(){
    if (this?.redirects && this.redirects?.length){
      const route = this.redirects.pop()!
      

      if (route.includes('?')){
        console.log('special route')
        const base = route.split('?')[0]
        const params = route.split('?')[1]
        console.log(base)
        console.log(params)
        console.log(params.split('=')[1])
        const navigationExtras: NavigationExtras = {
          queryParams: { checkoutID : params.split('=')[1] },
          state: {
            redirect: this.redirects

          }
        }
        this.router.navigate([decodeURIComponent(base)], navigationExtras)



      }
      else
      {
        const navigationExtras: NavigationExtras = {
          state: {
            redirect: this.redirects
          }
        }
        this.router.navigate([decodeURIComponent(route)], navigationExtras)
      }


    
    }
    else {
      this.router.navigate([""])
    }
  }
}