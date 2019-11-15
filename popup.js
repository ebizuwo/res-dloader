let getLinks = (type) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {from:"popup", subject:"DOMInfo"}, (response) => {
            //response here is the dom information that was collected from the content.js
            let arr = response.all_links;
            let send_arr = [];
            //TODO: Switch case here maybe? week definitely needs to be refined
            for(let i=0;i<arr.length;i++){
                if(type==="all" || arr[i].week==="all"){
                    send_arr.push(arr[i]);
                }
                if((type==="week1")&&(arr[i].week==="1")){
                    send_arr.push(arr[i])
                }
                if((type==="week2")&&(arr[i].week==="2")){
                    send_arr.push(arr[i]);
                }
                if((type==="week3")&&(arr[i].week==="3")){
                    send_arr.push(arr[i]);
                }
                if((type==="week4")&&(arr[i].week==="4")){
                    send_arr.push(arr[i]);
                }
            }
            //TODO: Make this another function ?
            chrome.tabs.sendMessage(tabs[0].id, {from:"popup", subject:"links", links: send_arr}, (response) => {
                if(response) {
                    console.log("sucessfully launched links");
                }
                else {
                    console.log("something went wrong launching links");
                }
            });
        });
    });
};


function init(){
    document.getElementById('download_all').addEventListener("click", (event) => {
        getLinks("download_all");
    });

    document.getElementById('week1').addEventListener("click", (event) => {
        getLinks("week1");
    });

    document.getElementById('week2').addEventListener("click", (event) => {
        getLinks("week2");
    });

    document.getElementById('week3').addEventListener("click", (event) => {
        getLinks("week3");
    });

    document.getElementById('week4').addEventListener("click", (event) => {
        getLinks("week4");
    });

}

document.addEventListener('DOMContentLoaded', init);
