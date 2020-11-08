declare var chrome: any;

chrome.storage.sync.get(null, ({ intention }) => {
  document.body.innerHTML = `<div> Hi ${intention} </div>`;
});
