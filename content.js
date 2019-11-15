//TODO: A lot of this is sort of dirty go back and clean up weeks and edge cases
//TODO: Fix loops that include sequential syntax... In favor of forEach()
chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // getting message from the popup to call the dom information
    // leaving some logic here so that popups and stuff can be displayed or
    // future case manipulate the dom
    if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
        let div = document.getElementsByClassName('rc-CML')[0];
        let links = div.getElementsByTagName("a");
        let domInfo = () => {
            function week_map() {
                weekMap = {};
                let text_lines = document.getElementsByClassName('rc-CML')[0].childNodes[0].innerText.split("\n").filter((v, i, arr) => {
                    return v !== ""
                });
                text_lines = ["To access the following links, University of Michigan access/sign-on is required", "Tips for viewing PowerPoint slides", "Week 1", "1.1 - What are Experiments", "1.2 - Basic Concepts", "1.3 Lab vs Field Experiments Part 1", "1.4 Lab vs. Field Experiments Part 2", "Week 2", "2.1 - Causal Inference and Experimentation", "2.2 - Randomizing", "2.3 - Trust Part 1", "2.4 - Trust Part 2", "Week 3", "3.1 - Stats Review and Statistical Power - Part 1", "3.2 - Stats Review and Statistical Power - Part 2", "3.3 - Blocking and Clustering", "3.4 - Differences-in-differences Estimator (DID)", "Week 4", "4.1 - Threats to Validity", "4.2 - Design and Analysis", "4.3 - Study Recommending Teams Promotes Pro-Social Lending"]
                text_lines.forEach((i,v)=>{
                    if(v.includes("Week")){

                    }
                });
            }
            let array = [];
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
                        'week': links[i].text.match(patt).toString().split(".")[0]
                    }
                    array.push(obj);
                }
            }
            return {'all_links':array};
        }
        console.log("sending domInfo");
        response(domInfo());
    }
    if ((msg.from === 'popup') && (msg.subject === 'links')) {
        console.log("received links from popup choices");
        console.log(msg.links);
        //TODO: Opening windows and tabs is clunky try something else
        for(let i = 0; i<msg.links.length; i++){
            console.log("executing links");
            try{
                window.open(msg.links[i].dlLink).blur();
                response(true);
            }catch (e) {
                console.log(e);
                response(false);
            }
        }
    }
});

//TODO: This is the INIT logic for detecting if on the lecture slides page
//TODO: Could be refined a bit
function init(){
    console.log("init called")
    let headline ="";
    try{
        headline = document.getElementsByClassName("tab-headline")[0].childNodes[0].innerText;
    }
    catch{
        console.log("headline not present in dom")
    }
    if((headline.includes("Slides"))|| (headline.includes("Slides"))) {
        console.log("detected change and slide is present");
        chrome.runtime.sendMessage({
          from: 'content',
          subject: 'showPageAction',
          tabHeadline: headline
        });
    }
    else{
        console.log("detected change and slide is not present");
        chrome.runtime.sendMessage({
          from: 'content',
          subject: 'hidePageAction',
          tabHeadline: headline
        });
    }
}

document.addEventListener('click', ()=>{
    console.log("init finna be called");
    setTimeout(function(){init();},500);
});





