alert("content is running");


var array = [];
var div = document.getElementsByClassName('rc-CML')[0];
var links = div.getElementsByTagName("a");
for(var i=0, max=links.length; i<max; i++) {
    var url = links[i].href;
    if(url.indexOf('https://drive.google.com/open') > -1) {
      var newUrl = 'https://drive.google.com/a/umich.edu/uc?id='+url.split('=')[1];
      array.push(newUrl);
      var tab = window.open(newUrl, '_blank');
    }
}

