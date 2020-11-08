declare var chrome: any;

chrome.storage.sync.get(null, (data: any) => {
  const { intention, sites } = data;
  document.body.innerHTML = `<div> You are focusing on ${intention}! Allowed sites: ${sites.map(
    (site: string) => '<ul>' + site + '</ul>'
  )} </div>`;
  document.body.style.display = 'flex';
  document.body.style.justifyContent = 'center';
  document.body.style.alignItems = 'center';
  document.body.style.minHeight = '100vh';
});
