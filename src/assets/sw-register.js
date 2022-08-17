var serviceworkerSupport = false

serviceworkerSupport = 'serviceWorker' in navigator ? true : false

subscribe = () => {
    console.log('this is test function')
    // sendPushSubscription()
}

notificationSound = ()=>{
    console.log('this is notification sound...')
}


// window.addEventListener('load', 
pushSubscribe = () => {
    console.log('document: ', document.getElementById('audiotag1'))
    console.log('service worker supported...')
    if (serviceworkerSupport) {
        navigator.serviceWorker.register('../push-sw.ts')
            .then(registration => {
                console.log("Service Worker registration completed ...", registration);
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey:
                        'BHebmqRIcMFi18L5VUNUXVxT3E5gcbxSsL7LPMPhAMnZslSlMilnJX7rAE-0ufoLY2lF6QQ1SERXPckKIw3gbng'
                }).then((pushSubs) => {
                    let pushSubscription = JSON.stringify(pushSubs)
                    console.log('pushSubscription: ', pushSubscription)
                    this.sessionStorage.setItem('pushSubscription', pushSubscription)
                    console.log('pushSubscription set to session storage successfully...')

                    // send push subscription
                    user = JSON.parse(sessionStorage.getItem('auth-user'))
                    let url = 'http://localhost:8081/subscription/add'
                    let payload = JSON.stringify({ username: user.username, pushSubscription: pushSubscription })
                    console.log('payload : ', payload)

                    fetch(url, {
                        method: "POST",
                        body: payload,
                        headers: { "Content-type": "application/json; charset=UTF-8" }
                    }).then((response) => {
                        console.log('endpoint addedd succesfully...')
                        getPushNotification()
                    }).catch(err => console.log(err));
                }).catch((err) => {
                    console.log('err: ', err)
                })
            });
    }
    else {
        console.log('service worker is not supported...')
    }
}
// );

getPushNotification = () => {
    let url = 'http://localhost:8081/WebHook/github/hugo'
    fetch(url, {
        method: "POST",
        body: null,
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then((res) => {
        console.log('get push res: ', res)
        console.log('we should get a notification...')
    }, (err) => {
        console.log('err: ', err)
    })
}


function unsubscribeNotificationService() {
    console.log('this is unsubscribe notification service...')
    // const registration = await navigator.serviceWorker.getRegistration();
    let registration = navigator.serviceWorker.getRegistration().then((res) => {
        console.log('res: ', res)
    }).catch((err) => {
        console.log('err: ', err)
    })
    console.log('registration : ', registration)
    let subscription = registration?.pushManager.getSubscription().then((res) => {
        console.log('res: ', res)
    }).catch((err) => {
        console.log('err: ', err)
    })
    console.log('subscription : ', subscription)
}