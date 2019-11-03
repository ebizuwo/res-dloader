// window.addEventListener('DOMContentLoaded', () => {
//     chrome.tabs.query({active: true, currentWindow: true}, tabs => {
//         chrome.tabs.sendMessage(tabs[0].id, {from: 'popup', subject: 'DOMInfo'}, setDOMInfo);
//     });
// });
let getLinks = (type) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {from:"popup", subject:"DOMInfo"}, (response) => {
            let arr = response.all_links;
            let send_arr = [];
            let wk = type.match(/\d+/)
            //TODO: change the 3 below to arr.length
            for(let i=0;i<3;i++){
                if(type==="all"){
                    send_arr.push(arr[i]);
                }
                if(type==="week1"){
                    send_arr.push(arr[i])
                }
                if(type==="week2"){
                    send_arr.push(arr[i]);
                }
                if(type==="week3"){
                    send_arr.push(arr[i]);
                }
                if(type==="week4"){
                    send_arr.push(arr[i]);
                }
            }
        });
    });
};

let sendLinks = (links) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {from:"popup", subject:"links", links:links}, (response) => {
          if(response) {
              console.log("sucessfully launched links");
          }
          else {
              console.log("something went wrong launching links");
          }
      });
    });
}


document.addEventListener('DOMContentLoaded', function load(event) {
    document.getElementById('download_all').addEventListener('click', getLinks("all"))
});

document.addEventListener('DOMContentLoaded', function load(event) {
        document.getElementById('week1').addEventListener('click', getLinks('week1'))
 });

document.addEventListener('DOMContentLoaded', function load(event) {
        document.getElementById('week2').addEventListener('click', getLinks('week2'))
 });

document.addEventListener('DOMContentLoaded', function load(event) {
        document.getElementById('week3').addEventListener('click', getLinks('week3'))
 });

document.addEventListener('DOMContentLoaded', function load(event) {
        document.getElementById('week4').addEventListener('click', getLinks('week4'))
 });