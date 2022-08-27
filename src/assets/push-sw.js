var newOrder = {};

function setToLocal(order) {
  console.log("set to local called...");
  localstorage.setItem("order", order);
}

// write only push event code
self.addEventListener("push", (e) => {
  console.log("detected push event.........");
  // console.log(typeof(JSON.parse(JSON.parse(e.data.text()).data.text())), JSON.parse(JSON.parse(e.data.text()).data.text()))
  let jsonObj = JSON.parse(e.data.text()).data;
  console.log("push event has data: ", jsonObj);
  newOrder = { order: jsonObj };

  const options = {
    body: "New order details here",
  };
  // e.waitUntil(self.registration.showNotification(title, options));
  let notification = self.registration
    .showNotification("New order has been placed", options)
    .then((res) => {
      console.log("success: ", res);
    })
    .catch((err) => {
      console.log("err: ", err);
    });
  console.log("notification: ", notification);
  // clients.openWindow("https://developers.google.com/web");
});

self.addEventListener("notificationclick", (event) => {
  console.log("[Service Worker] Notification click received.");
  // console.log("self : ", self.clients);  // need to check if client works and can open a window
  // console.log("self : ", self.WindowClient.postMessage("notification"));

  // event.notification.close();
  // let param = JSON.stringify(newOrder)
  let param = JSON.stringify({
    item1: "10kg",
    item2: "10kg",
    item3: "10kg",
    item4: "10kg",
    item5: "10kg",
    item6: "10kg",
    item7: "10kg",
  });
  let chatClient = clients.openWindow(
    `http://localhost:4200/orderAlert?order=${param}`
  );
  // chatClient.postMessage("New chat messages!");
});
