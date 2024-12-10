var options;

function onUnmuteButton() {
  if (options.unmute) options.unmute = false;
  else options.unmute = true;
  console.log(options.unmute);
  chrome.storage.local.set({ options: JSON.stringify(options) });
}

// document.addEventListener('DOMContentLoaded', () => {
//     const unmuteToggle = document.getElementById('unmute');
//     unmuteToggle.addEventListener("click", onUnmuteButton);
//     chrome.storage.local.get(["options"], function(result){
//         console.log(result);
//         if(!result.options){
//             options = {unmute: false}
//             chrome.storage.local.set({"options": JSON.stringify(options)});
//         }
//         else{
//             options = JSON.parse(result.options);
//         }
//         console.log(options);
//         unmuteToggle.checked = options.unmute;
//     });
// });
