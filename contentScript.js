
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;


var observer = new MutationObserver(function(mutations, observer) {
    changeTwitterLogo();
    changePostButtons();
    changeSeeNewPostsButton();
});
observer.observe(document.body, {childList});

chrome.runtime.onMessage.addListener(function (message) {
    if (message.eventType === "tabTitleChange") {
        changeTabTitle();
    }
});

changeLoadingPlaceHolder();
changeTabLogo();



function changeTwitterLogo() {
    const xLogo = document.querySelector("a[aria-label~=Twitter] > div");
    if(!xLogo || xLogo.getAttribute("changed") === "true") return;
    xLogo.innerHTML = '';
    const twitterLogoIcon = document.createElement('img');
    twitterLogoIcon.src = chrome.runtime.getURL("assets/twitter-logo32.png");
    xLogo.appendChild(twitterLogoIcon);
    xLogo.setAttribute("changed", "true");
}

function changeLoadingPlaceHolder() {
    const placeholder = document.getElementById("placeholder");
    if(!placeholder) return;
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

function changeTabTitle(){
    const regex = / X\b/g;
    const title = document.querySelector("title");
    const replacement = " Twitter";
    const result = title.innerHTML.replace(regex, replacement);
    title.innerHTML = result;
}

function changePostButtons(){
    const postButton1 = document.querySelector("div[data-testid~='tweetButtonInline'] > div > span > span");
    const postButton2 = document.querySelector("[data-testid~='SideNav_NewTweet_Button'] > div > span > div > div > span > span");
    const postButton3 = document.querySelector("div[data-testid~='tweetButton'] > div > span > span");
    [postButton1, postButton2, postButton3].forEach((button) => {
        if(button && button.getAttribute("changed") !== "true"){
            button.innerHTML = "Tweet";
            button.setAttribute("changed", "true");
        }
    });
}

function changeSeeNewPostsButton(){
    const button = document.querySelector("div[data-testid~='pillLabel'] > span > span > span")
    if(button && button.getAttribute("changed") !== "true"){
        button.innerHTML = "tweeted";
        button.setAttribute("changed", "true");
    }
}
