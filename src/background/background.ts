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
chrome.tabs.onUpdated.addListener((tabId: number) => {
  chrome.tabs.get(tabId, ({ url }: { url: string }) => {
    retrieveData(({ sites, endTime }) => {
      if (
        !sites.find((domain: string) => url.includes(domain)) &&
        endTime > Date.now()
      ) {
        chrome.tabs.executeScript(tabId, { file: 'clearPage.bundle.js' });
      }
    });
  });
});
