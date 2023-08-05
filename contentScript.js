
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;


const logoClass = "r-lrsllp";
const placeHolderId = "placeholder"
let logoChanged = false;


var observer = new MutationObserver(function(mutations, observer) {
    if(!logoChanged && document.getElementsByClassName(logoClass)[0]){
        changeTwitterLogo();
        logoChanged = true;
    }
    if(document.getElementById(placeHolderId)){
        changeLoadingPlaceHolder();
    }
});

observer.observe(document, {
  subtree: true,
  attributes: true
});

chrome.runtime.onMessage.addListener(function (message) {
    if (message.eventType === "tabTitleChange") {
        changeTabTitle();
    }
});

changeTabLogo();



function changeTwitterLogo() {
    const xLogo = document.getElementsByClassName(logoClass)[0];
    const container = xLogo.parentNode;
    container.innerHTML = '';
    const twitterLogoIcon = document.createElement('img');
    twitterLogoIcon.src = chrome.runtime.getURL("assets/twitter-logo32.png");
    container.appendChild(twitterLogoIcon);
}

function changeLoadingPlaceHolder() {
    const placeholder = document.getElementById(placeHolderId);
    placeholder.innerHTML = '';
    const twitterLogoIcon = document.createElement('img');
    twitterLogoIcon.src = chrome.runtime.getURL("assets/twitter-logo.png");
    twitterLogoIcon.style.width = '72px';
    twitterLogoIcon.style.height = '72px';
    twitterLogoIcon.style.display = 'block';
    twitterLogoIcon.style.margin = 'auto';
    placeholder.appendChild(twitterLogoIcon);
}

function changeTabLogo(){
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = chrome.runtime.getURL("assets/twitter-logo16.png");
}
