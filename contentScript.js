MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

const xPath =
  "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z";

var observer = new MutationObserver(function (mutations, observer) {
  changeMainLogo();
  changePostButtons();
  changeSeeNewPostsButton();
  changeTabTitle();
  changeVerifiedButton();
  changeAllTwitterLogo();
  //unmuteVideos();
});
observer.observe(document.body, { subtree: true, childList: true });

changeLoadingPlaceHolder();
changeTabLogo();

function changeMainLogo() {
  const xLogo = document.querySelector("a[aria-label~=X] > div");
  if (!xLogo || xLogo.getAttribute("changed") === "true") return;
  xLogo.innerHTML = "";
  const twitterLogoIcon = document.createElement("img");
  twitterLogoIcon.src = chrome.runtime.getURL("assets/twitter-logo.png");
  twitterLogoIcon.style.width = "32px";
  twitterLogoIcon.style.height = "32px";
  xLogo.appendChild(twitterLogoIcon);
  xLogo.setAttribute("changed", "true");
}

function changeLoadingPlaceHolder() {
  const placeholder = document.getElementById("placeholder");
  if (!placeholder) return;
  placeholder.innerHTML = "";
  const twitterLogoIcon = document.createElement("img");
  twitterLogoIcon.src = chrome.runtime.getURL("assets/twitter-logo.png");
  twitterLogoIcon.style.width = "72px";
  twitterLogoIcon.style.height = "72px";
  twitterLogoIcon.style.display = "block";
  twitterLogoIcon.style.margin = "auto";
  placeholder.appendChild(twitterLogoIcon);
}

function changeTabLogo() {
  var link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = chrome.runtime.getURL("assets/twitter-logo16.png");
}

function changeTabTitle() {
  const title = document.querySelector("title");
  if (!title) return;
  const regex = /X\b/g;
  const replacement = " Twitter";
  const result = title.innerHTML.replace(regex, replacement);
  if (result === title.innerHTML) return;
  title.innerHTML = result;
}

function changePostButtons() {
  const postButton1 = document.querySelector(
    "[data-testid~='tweetButtonInline'] > div > span > span"
  );
  const postButton2 = document.querySelector(
    "[data-testid~='SideNav_NewTweet_Button'] span > span"
  );
  const postButton3 = document.querySelector(
    "[data-testid~='tweetButton'] > div > span > span"
  );
  [postButton1, postButton2, postButton3].forEach((button) => {
    if (button && button.getAttribute("changed") !== "true") {
      button.innerHTML = "Tweet";
      button.setAttribute("changed", "true");
    }
  });
}

function changeSeeNewPostsButton() {
  const button = document.querySelector(
    "div[data-testid~='pillLabel'] > span > span > span"
  );
  if (button && button.getAttribute("changed") !== "true") {
    button.innerHTML = "tweeted";
    button.setAttribute("changed", "true");
  }
}

function changeAllTwitterLogo() {
  const originalLogos = document.querySelectorAll(
    `path[d=${CSS.escape(xPath)}]`
  );
  if (originalLogos.length === 0) return;
  originalLogos.forEach((originalLogo) => changeTwitterLogo(originalLogo));
}

function changeTwitterLogo(originalLogo) {
  let container = originalLogo.parentNode;
  while (container.nodeName !== "DIV") {
    container = container.parentNode;
  }
  if (!container) return;
  if (
    container.children[1] &&
    container.children[1].tagName === "svg" &&
    container.children[1].style.display !== "none"
  ) {
    container.removeChild(container.firstChild);
    container.setAttribute("changed", "false");
  }
  if (container.getAttribute("changed") !== "true") {
    const twitterLogoIcon = document.createElement("img");
    twitterLogoIcon.src = chrome.runtime.getURL("assets/twitter-logo.png");
    let originalWidth =
      originalLogo.parentNode.parentNode.getBoundingClientRect().width;
    if (originalWidth > 100) {
      originalWidth = 450;
      twitterLogoIcon.style.margin = "auto";
      const otherLogo = document.querySelector("div[changed='true']");
      if (otherLogo) otherLogo.firstChild.style.display = "none";
    }
    twitterLogoIcon.style.width = `${originalWidth}px`;
    twitterLogoIcon.style.height = "auto";
    twitterLogoIcon.style.maxWidth = "100%";
    twitterLogoIcon.style.display = "block";
    container.firstChild.style.display = "none";
    container.insertBefore(twitterLogoIcon, container.firstChild);
    container.setAttribute("changed", "true");
  }
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function unmuteVideos() {
  chrome.storage.local.get(["options"], async (result) => {
    if (!result.options) return;
    const options = JSON.parse(result.options);
    if (!options.unmute) return;
    const player = Array.from(
      document.querySelectorAll("div[data-testid='videoPlayer']")
    ).find((p) => isInViewport(p));
    if (!player) return;
    player.dispatchEvent(
      new MouseEvent("mouseover", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );
    await new Promise((resolve) => setTimeout(resolve, 500));
    const unmuteButton = player.querySelector("button[aria-label='Unmute']");
    if (unmuteButton) unmuteButton.click();
  });
}

function changeVerifiedButton() {
  const verifiedIcon = document.querySelector(
    "a[aria-label='Premium'] > div > div"
  );
  const verifiedText = document.querySelector(
    "a[aria-label='Premium'] > div > div > span"
  );
  const isDarkMode =
    document.querySelector("html").style.colorScheme === "dark";
  if (verifiedText && verifiedText.getAttribute("changed") !== "true") {
    verifiedText.innerHTML = "Verified";
    verifiedText.setAttribute("changed", "true");
  }
  if (!verifiedIcon || verifiedIcon.getAttribute("changed") === "true") return;
  verifiedIcon.innerHTML = "";
  const newVerifiedIcon = document.createElement("img");
  const imageName = isDarkMode
    ? "assets/verified-badge-white.svg"
    : "assets/verified-badge.svg";
  newVerifiedIcon.src = chrome.runtime.getURL(imageName);
  verifiedIcon.appendChild(newVerifiedIcon);
  verifiedIcon.setAttribute("changed", "true");
}
