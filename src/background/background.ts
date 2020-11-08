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

// listen for tab loads to filter usage
chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: any) => {
  const url = changeInfo.pendingUrl || changeInfo.url;
  const hostname = new URL(url).hostname;

  retrieveData(({ sites, endTime }) => {
    // block site if not in allow list and session is in progress
    if (
      !sites.find((domain: string) => hostname.includes(domain)) &&
      endTime > Date.now()
    ) {
      chrome.tabs.executeScript(tabId, { file: 'clearPage.bundle.js' });
    }
  });
});
