import { Injectable } from '@angular/core';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Router, NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  getUserAttributes(): User {
    if (!this.isLoggedIn()){
      return <User>({email: ''})
    }
    let userID: User = <User>({})

    /*
    let userID: User = <User>(email: localStorage.getItem('userEmail'), sub: localStorage.getItem('userID') }
    { if (userID.email !== null && userID.sub !== null) {
      console.log('User Attributes thanks to local memory')
      console.log(userID)
      return userID
    }
    */



    /*
    const currentNav = this.router.getCurrentNavigation()
    const state = currentNav?.extras.state as {
      userObj: User
    };

    if (state.userObj !== undefined){
      return state.userObj
    }
    */


    let poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    };

    var userPool = new CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
        }
        let payload = session.getIdToken().decodePayload()
        userID.email = payload['email']
        userID.sub = payload['sub']
      })
    }
    localStorage.setItem('userEmail', userID.email)
    localStorage.setItem('userID', userID.sub)

    return userID;

  }


  isLoggedIn(): boolean {
    /*if (localStorage.getItem('isLoggedIn') === 'true') {
      /* TODO Delete this line
      return true
    }*/
    var isAuth = false;

    let poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    };

    try {
      var userPool = new CognitoUserPool(poolData);
      var cognitoUser = userPool.getCurrentUser();


      if (cognitoUser != null) {
        cognitoUser.getSession((err: any, session: any) => {
          if (err) {
            alert(err.message || JSON.stringify(err));

          }
          isAuth = session.isValid();
        })
      }
      localStorage.setItem('isLoggedIn', 'true');

      return isAuth;
    }
    catch {
      localStorage.setItem('isLoggedIn', 'false');

      return false;
    }
  }

  onLogout(): void {
    let poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    };
    let userPool = new CognitoUserPool(poolData);
    let cognitoUser = userPool.getCurrentUser();
    console.log(cognitoUser)
    cognitoUser?.signOut();
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('userEmail', '')
    localStorage.setItem('userID', '')

  }
  
}


