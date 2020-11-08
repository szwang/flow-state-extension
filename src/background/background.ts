// close tabs
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  const url = changeInfo.pendingUrl || changeInfo.url;
  const hostname = new URL(url).hostname;

  chrome.storage.sync.get(['sites', 'endTime'], ({ sites, endTime }) => {
    if (
      !sites.find((domain) => hostname.includes(domain)) &&
      endTime > Date.now()
    ) {
      alert('site is blocked!!');
    } else {
      alert('site is not blocked');
    }
  });
});
