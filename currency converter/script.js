console.log("testing...");

// Authentication
var myHeaders = new Headers();
    myHeaders.append("apikey", "9mMgGfu1Mqey9yT2UD0vZiS5woUBChQ5");
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      };

// Getting currencies
window.addEventListener("load", () => {
  fetch("https://api.apilayer.com/currency_data/list", requestOptions)
    .then((a) => a.json())
    .then((response) => {
      // console.log(Object.keys(response.currencies).length);
      //console.log(Object.keys(response.currencies)[0]);
      for (i = 0; i < Object.keys(response.currencies).length; i++) {
        var list = document.getElementById("list");
        var list2 = document.getElementById("list2");
        var option = document.createElement("option");
        var option2 = document.createElement("option");
        option.text = Object.keys(response.currencies)[i];
        option.value = Object.keys(response.currencies)[i];
        option2.text = Object.keys(response.currencies)[i];
        option2.value = Object.keys(response.currencies)[i];
        list.append(option);
        list2.append(option2);  
      }
    })
  });

// converting money
const message = document.querySelector("#user");
message.addEventListener('input', function () {
  var from = document.getElementById("list").value;
  var to = document.getElementById("list2").value;
  fetch("https://api.apilayer.com/currency_data/convert?to="+to+"&from="+from+"&amount="+message.value, requestOptions)
  .then((a) => a.json())
  .then(response => {
    console.log(response.result);
    document.getElementById("value2").value = "$ " + response.result;
  })
});

// var response = {
//   "info": {
//     "quote": 116.614859,
//     "timestamp": 1661401444
//   },
//   "query": {
//     "amount": 5,
//     "from": "AED",
//     "to": "AOA"
//   },
//   "result": 583.074295,
//   "success": true
// }
