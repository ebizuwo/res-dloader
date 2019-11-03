function Slide(title, id, dlLink, parent, parent_path, p_img, week){
    this.title = title;
    this.id = id;
    this.dlLink = dlLink;
    this.parent = parent;
    this.parent_path = parent_path;
    this.p_img = p_img;
    this.week = week;

}
function getWeek(title){
    let patt = /\d[.]\d+/;
    let lecture = title.match(patt);
    return lecture.split(".")[0];
}

function check_if_cseraorg(){
}

function create_obj_array() {
    let array = [];
    let div = document.getElementsByClassName('rc-CML')[0];
    let links = div.getElementsByTagName("a");
    for (let i = 0, max = links.length; i < max; i++) {
        let url = links[i].href;
        if (url.indexOf('https://drive.google.com/open') > -1) {
            let obj = new Slide();
            obj.id= url.split('=')[1];
            obj.title = links[i].text;
            obj.dlLink = 'https://drive.google.com/a/umich.edu/uc?id=' + obj.id;
            obj.parent = links[i].parentElement;
            obj.parent_path = obj.parent
            obj.pimg = "images/download.png";
            obj.week = getWeek(links[i].text);
            array.push(obj);
        }
    }
    return array;
}

function get_links(weeknum){
    // let links = create_obj_array();
    for (let i=0, n = 3 ; i<n; i++){
        if (weeknum === "all"){
            chrome.browserAction.onClicked.addListener(function(activeTab){
                var newURL = "www.google.com";
                chrome.tabs.create({ url: newURL });
            });
        }
        if (weeknum === 1){

        }
        if (weeknum === 2){

        }
        if (weeknum === 3){

        }
        if (weeknum === 4){

        }
    }


}


function download_all() {
    // let links = create_obj_array();
    // for (let i=0, n = links.length ; i<n; i++){
    //
    // }
    get_links("all");
}

function week1(){

    get_links(1);
}

function week2(){
    get_links(2);

}
function week3(){
    get_links(3);

}
function week4(){
    get_links(4);

}


// var array = [];
// var div = document.getElementsByClassName('rc-CML')[0];
// var links = div.getElementsByTagName("a");
// for (var i = 0, max = links.length; i < max; i++) {
//     var url = links[i].href;
//     if (url.indexOf('https://drive.google.com/open') > -1) {
//         var newUrl = 'https://drive.google.com/a/umich.edu/uc?id=' + url.split('=')[1];
//         array.push(newUrl);
//         // var tab = window.open(newUrl, '_blank');
//     }
// }


document.addEventListener('DOMContentLoaded', function load(event) {
        document.getElementById('download_all').addEventListener('click', download_all)
 });

document.addEventListener('DOMContentLoaded', function load(event) {
        document.getElementById('week1').addEventListener('click', week1)
 });

document.addEventListener('DOMContentLoaded', function load(event) {
        document.getElementById('week2').addEventListener('click', week2)
 });

document.addEventListener('DOMContentLoaded', function load(event) {
        document.getElementById('week3').addEventListener('click', week3)
 });

document.addEventListener('DOMContentLoaded', function load(event) {
        document.getElementById('week4').addEventListener('click', week4)
 });