function run (_input, _parameters) {
  const appName = 'Download YouTube Videos'
  const app = Application.currentApplication()
  app.includeStandardAdditions = true

  const Safari = Application('Safari')
  let tabs = []

  for (let i = 0; i < Safari.windows.length; i++) {
    Array.prototype.push.apply(
      tabs,
      Safari.windows[i].tabs.whose({ url: { _beginsWith: 'https://www.youtube.com/watch' } })
    )
  }

  switch (tabs.length) {
    case 0:
      app.displayNotification('No videos found.', {
        subtitle: 'Exiting now!',
        withTitle: appName
      })
      break

    case 1:
      app.displayNotification('1 video found.', {
        subtitle: 'Starting download now!',
        withTitle: appName
      })
      break

    default:
      app.displayNotification(`${tabs.length} videos found.`, {
        subtitle: 'Starting downloads now!',
        withTitle: appName
      })
  }

  tabs.forEach((tab) => {
    app.displayDialog(tab.url())
    // app.doShellScript("export PATH=\"/usr/local/bin:$PATH\"; cd ~/Downloads; youtube-dl " + tab.url())
  })

  return tabs
}
