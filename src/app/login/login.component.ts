import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { Data } from '@syncfusion/ej2-angular-grids';

//var webpush = require('web-push');
// importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  storeName: string[] = [];
  storeType: string;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private http: HttpClient) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.storeName = this.tokenStorage.getStoreName().storeName;
    }

    // setTimeout(() => {
    //   console.log('timeout')
    //   // this.requestPermission()
    //   this.sendPushSubscription()
    // }, 5000);
  }

  requestPermission() {
    // console.log('req')
    // const firebaseConfig = {
    //   apiKey: "AIzaSyBj6ByntC1AkKEXDSKN2tmObxS9pTHrqzk",
    //   authDomain: "angular-push-notificatio-42e5d.firebaseapp.com",
    //   projectId: "angular-push-notificatio-42e5d",
    //   storageBucket: "angular-push-notificatio-42e5d.appspot.com",
    //   messagingSenderId: "480253073558",
    //   appId: "1:480253073558:web:55b3e695dfc02698ce8ab7",
    //   measurementId: "G-HJWTP69FF1",
    // };

    // let serviceWorker = JSON.parse(localStorage.getItem('registration')) 
    // console.log('registration : ', serviceWorker)



    // let sw = navigator.serviceWorker.ready.then((res) => {
    //   console.log('res : ', res)
    // }).catch((err) => {
    //   console.log('err : ', err)
    // })
    // let push = sw.pushManager.subscribe({
    //   userVisibleOnly: true,
    //   applicationServerKey:
    //     'BHebmqRIcMFi18L5VUNUXVxT3E5gcbxSsL7LPMPhAMnZslSlMilnJX7rAE-0ufoLY2lF6QQ1SERXPckKIw3gbng'
    // });
    // console.log('push: ', JSON.stringify(push));
    // console.log('sw: ', sw)
    // firebase.initializeApp(firebaseConfig);
    // console.log(firebase)

    // const messaging = firebase.messaging();
    // console.log(messaging)
  }

  getPushNotification() {
    let url = 'http://localhost:8081/WebHook/github/hugo'
    this.http.post(url, null).subscribe((res) => {
      console.log('get push res: ', res)
    }, (err) => {
      console.log('err: ', err)
    })
  }

  sendPushSubscription() {
    let user = JSON.parse(sessionStorage.getItem('auth-user'))
    let pushSubscription = sessionStorage.getItem('pushSubscription')
    console.log('user: ', user.username)
    console.log('pushSubscription : ', pushSubscription)

    let url = 'http://localhost:8081/subscription/add'
    let payload = JSON.stringify({ username: user.username, pushSubscription: pushSubscription })

    this.http.post(url, payload).subscribe((res) => {
      console.log('push response: ', res)
      console.log('requesting push notification...')
      // this.getPushNotification()
    }, (err) => {
      console.log('error : ', err)
    })
  }

  // sendPush() {
  //   let sub = {
  //     "endpoint": "https://wns2-pn1p.notify.windows.com/w/?token=BQYAAAAdAHcnfLSxdq1hC%2b1%2fvwUJb2DeyKhKH1XpAlWYW12WCMNZYH55m5E%2fApuwEm%2b1j0APZ5mlnwKJ9H6oRx8s6psOlGA9FIB2iiAXKL6N1AP5by6PbozdGOm1Yomb1DbxsnQ2NMiB7CJqfVRBgvntJ7GI4ekLMjR36RhR81uDsmYGMMKJNncl7N4K0XPGA5walDDJWHr06xg0KlWO23SikLNsHnltHR2dfzmXqbVkbj%2f7QiuFYXolZzOSYfJ9QmVFxek9B9%2bZlAA3SfRjYRThOLoRHYVCq2Zemc31tNLe2zP6XZ74QbGvElRFyrgLx9xJjkg%3d",
  //     "expirationTime": null,
  //     "keys": {
  //       "p256dh": "BFJr4P-3eBhB1V8OUsI2POPG2s3pLeihCl7oIOzW2rTaou-yUz2ERxC7-P8M8K2COtYCjt7YulV8S-nlCB11lro",
  //       "auth": "2JZOh3o8YmdBrhqoniTBCQ"
  //     }
  //   }

  //   let vapidKeys = {
  //     publicKey:
  //       'BHebmqRIcMFi18L5VUNUXVxT3E5gcbxSsL7LPMPhAMnZslSlMilnJX7rAE-0ufoLY2lF6QQ1SERXPckKIw3gbng',
  //     privateKey: 'PbR4vVQEWx3PskWh8RvMatOKpkXQplNgH3lcuundIck'
  //   };

  //   webpush.setVapidDetails(
  //     'mailto:test@code.co.uk',
  //     vapidKeys.publicKey,
  //     vapidKeys.privateKey
  //   );

  //   webpush.sendNotification(sub, 'Your Push Payload Text');
  // }


  onSubmit() { 
    this.authService.login(this.form).subscribe(
      data => {
        console.log('login success data: ', data)
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.storeName = data.username;
        this.storeType = data.storeType;
        this.reloadPage();
      },
      err => {
        if (err.status === 401) {
          this.errorMessage = "Username / Password does not match.";
        } else {
          this.errorMessage = err.error.message;
        }
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
