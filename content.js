chrome.runtime.sendMessage({
  from: 'content',
  subject: 'showPageAction',
});

chrome.runtime.onMessage.addListener((msg, sender, response) => {
    if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
        let domInfo = () => {
            let array = [];
            let div = document.getElementsByClassName('rc-CML')[0];
            let links = div.getElementsByTagName("a");
            for (let i = 0, max = links.length; i < max; i++) {
                let url = links[i].href;
                let patt = /\d[.]\d+/;
                if (url.indexOf('https://drive.google.com/open') > -1) {
                    let id = url.split('=')[1]
                    let obj = {
                        'id': id,
                        'title' : links[i].text,
                        'dlLink':'https://drive.google.com/a/umich.edu/uc?id=' + id,
                        'parent':links[i].parentElement,
                        'parent_path':links[i].parentElement,
                        'pimg':"images/download.png",
                        'week':links[i].text.match(patt).toString().split(".")[0]
                    }
                    array.push(obj);
                }
            }
            return {'all_links':array};
        }
        console.log("sending domInfo");
        response(domInfo());
    }
});

chrome.runtime.onMessage.addListener( (msg, sender, response) => {
    if ((msg.from === "popup") && (msg.subject==="links")){
        for(let i=0; i<msg.links; i++){
            window.open(msg.links[i]);
        }
        response(true)
    }
});



// chrome.browserAction.onClicked.addListener(function(activeTab){
//     var newURL = "http://stackoverflow.com/";
//     chrome.tabs.create({ url: newURL });
// });
//
// alert("content is running");
// var array = [];
// var div = document.getElementsByClassName('rc-CML')[0];
// var links = div.getElementsByTagName("a");
// for(var i=0, max=links.length; i<max; i++) {
//     var url = links[i].href;
//     if(url.indexOf('https://drive.google.com/open') > -1) {
//       var newUrl = 'https://drive.google.com/a/umich.edu/uc?id='+url.split('=')[1];
//       array.push(newUrl);
//       var tab = window.open(newUrl, '_blank');
//     }
// }

