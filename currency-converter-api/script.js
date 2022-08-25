console.log("testing...");

// Initalizing variables
var currentcurr;
var currentlist;
var newlink
var keyword;
var reversekey;
var reverselink;
var oldcurr;
var oldlist;
var oldlink;
var from = document.getElementById("list");
var to = document.getElementById("list2");
from.addEventListener("click", () => {
  getrate();
});
to.addEventListener("click", () => {
  getrate();
})

// Authentication
var myHeaders = new Headers();
    myHeaders.append("apikey", "V5CEPdqCYlWSBoJVqn5W8rvNFDMFxB2E");
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      };

var currencies = "";
// Getting currencies
window.addEventListener("load", () => {
  fetch("https://api.apilayer.com/currency_data/list", requestOptions)
    .then((a) => a.json())
    .then((response) => {
      // console.log(Object.keys(response.currencies).length);
      //console.log(Object.keys(response.currencies)[0]);
      for (i = 0; i < Object.keys(response.currencies).length; i++) {
        if (i == 0) {
          currencies += Object.keys(response.currencies)[i];
        } else {
          currencies += "%2C" + Object.keys(response.currencies)[i];
        }
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
getrate();

function getrate(){
  oldcurr = currentcurr;
  oldlist = currentlist;
  newlink = "https://api.apilayer.com/currency_data/live?source="+from.value+"&currencies="+currencies;
  console.log(newlink);
  console.log(from.value);
  console.log(to.value);
  if (newlink == oldlink || newlink == reverselink && (from.value + to.value) != keyword) {
    console.log("This link has been used before therefore no request to API was sent");
  } else {
    console.log("This link hasn't been used before therefore request to API was sent");
    fetch("https://api.apilayer.com/currency_data/live?source="+from.value+"&currencies="+currencies, requestOptions)
      .then((a) => a.json())
      .then((response) => {
        currentlist = response.quotes;
    })
  }
}

//converting money
const message = document.querySelector("#user");
message.addEventListener('input', function () {
  oldlink = "https://api.apilayer.com/currency_data/live?source="+from.value+"&currencies="+currencies;
  reverslink = "https://api.apilayer.com/currency_data/live?source="+to.value+"&currencies="+currencies;
  keyword = from.value + to.value;
  reversekey = to.value + from.value;
  if (from.value == to.value) {
    currentcurr = from.value;
    document.getElementById("value2").value = "$ " + message.value;
  } else if (Object.keys(oldlist).includes(keyword) && true) {
    var exchangerate = oldlist[keyword];
    var amount = message.value * exchangerate;
    document.getElementById("value2").value = "$ " + amount.toFixed(2);
  } else if (Object.keys(oldlist).includes(reversekey) && true) {
    var exchangerate = oldlist[reversekey];
    var amount = message.value / exchangerate;
    document.getElementById("value2").value = "$ " + amount.toFixed(2);
  } else if (Object.keys(oldlist).includes(reversekey) || Object.keys(oldlist).includes(keyword) || from.value == from.value) {
    fetch("https://api.apilayer.com/currency_data/live?source="+from.value+"&currencies="+currencies, requestOptions)
      .then((a) => a.json())
      .then((response) => {
        currentlist = response.quotes;
        var exchangerate = currentlist[keyword];
        var amount = message.value * exchangerate;
        document.getElementById("value2").value = "$ " + amount.toFixed(2);
      })
  } else {
    var exchangerate = currentlist[keyword];
    var amount = message.value * exchangerate;
    document.getElementById("value2").value = "$ " + amount.toFixed(2);
  }
});