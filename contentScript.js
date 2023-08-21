
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

const xPath = "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"

var observer = new MutationObserver(function(mutations, observer) {
    changeTwitterLogo();
    changePostButtons();
    changeSeeNewPostsButton();
    changeLoginPageLogo();
});
observer.observe(document.body, {subtree: true, childList: true});

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
    const regex = /X\b/g;
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

function changeLoginPageLogo(){
    const originalLogo = document.querySelector(`path[d=${CSS.escape(xPath)}]`);
    if(!originalLogo) return;
    let container = originalLogo.parentNode;
    while(container.nodeName !== "DIV"){
        container = container.parentNode;
    }
    if(container && container.children[1] && container.children[1].tagName === "svg" && container.children[1].style.display !== "none"){
        container.removeChild(container.firstChild);
        container.setAttribute("changed", "false");
    }
    if(container && container.getAttribute("changed") !== "true"){
        const twitterLogoIcon = document.createElement('img');
        twitterLogoIcon.src = chrome.runtime.getURL("assets/twitter-logo.png");
        let originalWidth = originalLogo.parentNode.parentNode.getBoundingClientRect().width;
        if(originalWidth > 100){
            originalWidth = 450;
            twitterLogoIcon.style.margin = "auto";
            const otherLogo = document.querySelector("div[changed='true']");
            if(otherLogo) otherLogo.firstChild.style.display = "none";
        }
        twitterLogoIcon.style.width = `${originalWidth}px`;
        twitterLogoIcon.style.height = 'auto';
        twitterLogoIcon.style.maxWidth = '100%';
        twitterLogoIcon.style.display = 'block';
        container.firstChild.style.display = 'none';
        container.insertBefore(twitterLogoIcon, container.firstChild);
        container.setAttribute("changed", "true");
    }
}
