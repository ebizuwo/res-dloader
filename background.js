chrome.runtime.onMessage.addListener((msg, sender) => {
  if ((msg.from === 'content') && (msg.subject === 'showPageAction') && (msg.tabHeadline = "Lecture Slides")) {
    chrome.pageAction.show(sender.tab.id);
  }
  else{
    chrome.pageAction.hide(sender.tab.id);
  }
});

