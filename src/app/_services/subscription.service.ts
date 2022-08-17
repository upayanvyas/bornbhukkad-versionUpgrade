import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  sendPushSubscription() {
    console.log('this is send push subs...')
    // let user = JSON.parse(sessionStorage.getItem('auth-user'))
    // let pushSubscription = sessionStorage.getItem('pushSubscription')
    // console.log('user: ', user.username)
    // console.log('pushSubscription : ', pushSubscription)

    // let url = 'http://localhost:8081/subscription/add'
    // let payload = JSON.stringify({ username: user.username, pushSubscription: pushSubscription })

    // this.http.post(url, payload).subscribe((res) => {
    //   console.log('push response: ', res)
    //   console.log('requesting push notification...')
    //   // this.getPushNotification()
    // }, (err) => {
    //   console.log('error : ', err)
    // })
  }
}
