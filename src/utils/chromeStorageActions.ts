import type { SessionData } from '../components/Options/Options';

declare var chrome: any;

export function startSession(
  intention: string,
  duration: string,
  sites: Array<string>
) {
  const currentTime = Date.now();
  // change duration from min to ms
  const durationMs = parseInt(duration) * 60 * 1000;
  const endTime = currentTime + durationMs;

  chrome.storage.sync.set(
    {
      intention,
      endTime,
      sites,
    },
    () => {
      chrome.storage.sync.get(null, (data: SessionData) => {
        console.log('data after set', data);
      });
    }
  );
}

export function writeNewSiteList(
  sites: Array<string>,
  stateUpdate: () => void
) {
  chrome.storage.sync.set({ sites }, () => {
    stateUpdate();
  });
}
