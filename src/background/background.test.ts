import { retrieveData } from './background';

describe('retrieveData', () => {
  it('gets sites and endTime keys from chrome storage', () => {
    retrieveData(() => jest.fn());
    expect(chrome.storage.sync.get).toHaveBeenCalledTimes(1);
    const keys = chrome.storage.sync.get.mock.calls[0][0];
    expect(keys).toEqual(['sites', 'endTime']);
  });
});
