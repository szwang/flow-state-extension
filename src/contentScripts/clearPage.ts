declare var chrome: any;

chrome.storage.sync.get(null, ({ intention }: { intention: string }) => {
  document.body.innerHTML = `<div> Hi ${intention} </div>`;
});
