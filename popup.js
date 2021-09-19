let generateLink = document.querySelector("#generate");
let copyLinkBtn = document.querySelector("#copyLinkBtn");
let toastWarning = document.querySelector(".toast-warning");
let toastSuccess = document.querySelector(".toast-success");
let toastCopied = document.querySelector(".toast-primary");
let toastError = document.querySelector(".toast-error");
let toastClose = document.querySelector("#close");
let mainLabel = document.querySelector("#mainLabel");
let url = "http://localhost:5000/urlCombiner";

console.log(copyLinkBtn);
console.log(mainLabel);

var shortURL = "shortURL";

generateLink.addEventListener("click", () => {
  console.log("start generating link");
  closeToasts();
  toastWarning.classList.remove("d-hide");

  chrome.tabs.query(
    { currentWindow: true, highlighted: true },
    function (tabs) {
      closeToasts();
      toastWarning.classList.remove("d-hide");

      const fullUrls = [];

      for (let i = 0; i < tabs.length; i++) {
        fullUrls.push(tabs[i].url);
      }

      fetch(url, {
        method: "POST",
        body: new URLSearchParams({ fullUrls: [fullUrls] }),
      })
        .then((response) => response.json())
        .then((json) => {
          closeToasts();
          console.log(json);
          shortURL = json

          mainLabel.innerHTML = shortURL;

          toastSuccess.classList.remove("d-hide");
          generateLink.classList.add("d-hide");
          copyLinkBtn.classList.remove("d-hide");
          return;
        })
        .catch((err) => {
          closeToasts();
          toastError.classList.remove("d-hide");
          return;
        });
    }
  );
});

copyLinkBtn.addEventListener("click", async () => {
  copyToClipboard();
});

mainLabel.addEventListener("click", async () => {
  if ((!copyLinkBtn, classList.contains("d-hide"))) {
    copyToClipboard();
  }
});

toastClose.addEventListener("click", async () => {
  closeToasts();
});

function copyToClipboard() {
  closeToasts();
  var copyFrom = document.createElement("textarea");
  copyFrom.value = shortURL;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand("copy");
  document.body.removeChild(copyFrom);
  toastCopied.classList.remove("d-hide");
  setTimeout(() => {
    toastCopied.classList.add("d-hide");
  }, 2000);
}

function closeToasts() {
  if (!toastError.classList.contains("d-hide")) {
    toastError.classList.add("d-hide");
  }
  if (!toastSuccess.classList.contains("d-hide")) {
    toastSuccess.classList.add("d-hide");
  }
  if (!toastWarning.classList.contains("d-hide")) {
    toastWarning.classList.add("d-hide");
  }
  if (!toastCopied.classList.contains("d-hide")) {
    toastCopied.classList.add("d-hide");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query(
    { currentWindow: true, highlighted: true },
    function (tabs) {
      console.log(tabs.length);
      let numOfTabs = 1;
      numOfTabs = tabs.length;
      document.getElementById("numTabs"), (innerHTML = numOfTabs);
    }
  );
});
