// background script for filtering sites

interface LoadingData {
  sites: Array<string>;
  endTime: number;
}

// get sites and endTime from storage
export function retrieveData(cb: (data: LoadingData) => void) {
  chrome.storage.sync.get(['sites', 'endTime'], (data: LoadingData) => {
    cb(data);
  });
}

// close tabs
chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: any) => {
  const url = changeInfo.pendingUrl || changeInfo.url;
  const hostname = new URL(url).hostname;

  retrieveData(({ sites, endTime }) => {
    if (
      !sites.find((domain: string) => hostname.includes(domain)) &&
      endTime > Date.now()
    ) {
      chrome.tabs.executeScript(tabId, { file: 'clearPage.bundle.js' });
    } else {
      // alert('site is not blocked');
    }
  });
});
