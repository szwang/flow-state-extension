// close tabs
chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: any) => {
  const url = changeInfo.pendingUrl || changeInfo.url;
  const hostname = new URL(url).hostname;

  chrome.storage.sync.get(
    ['sites', 'endTime'],
    ({ sites, endTime }: { sites: Array<string>; endTime: number }) => {
      if (
        !sites.find((domain: string) => hostname.includes(domain)) &&
        endTime > Date.now()
      ) {
        chrome.tabs.executeScript(tabId, { file: 'clearPage.bundle.js' });
      } else {
        // alert('site is not blocked');
      }
    }
  );
});
