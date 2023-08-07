chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.title && / X\b/g.test(changeInfo.title)) {
        chrome.tabs.sendMessage(tabId,
            { eventType: "tabTitleChange", title: changeInfo.title });
      }
  });