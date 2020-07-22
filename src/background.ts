import { Octokit } from "@octokit/rest"
import registerProxyScript = browser.proxy.registerProxyScript;
const octokit = new Octokit()

browser.tabs.onUpdated.addListener((tabId, _, tab) => {
  if (!tab.url) {
    return
  }
  const url = new URL(tab.url)
  const isGitHubPages = isURLGitHubPages(url)
  if (!isGitHubPages) {
    return
  }
  browser.pageAction.show(tabId)
})

browser.pageAction.onClicked.addListener(async (tab) => {
  if (!tab.url) {
    return
  }
  const url = new URL(tab.url)
  const isGitHubPages = isURLGitHubPages(url)
  if (!isGitHubPages) {
    return
  }
  const username = url.hostname.replace(/\.github\.io$/, "")
  const repo = url.pathname.split("/")[1]

  // const repoData = await (await fetch(`https://api.github.com/repos/${username}/${repo}`)).json()
  let repoUrl
  try {
    const response = await octokit.repos.get({
      owner: username,
      repo: repo
    })
    repoUrl = response.data.html_url
    debugger
  } catch (e) {
    const response = await octokit.repos.get({
      owner: username,
      repo: `${username}.github.io`
    })
    repoUrl = response.data.html_url
  }

  window.open(repoUrl)
})

const isURLGitHubPages = (url: URL) => url.hostname.endsWith(".github.io")
