import "./download.styl"
import template from "./download.pug"

import autobind from "autobind-decorator"
import BaseComponent from "components/base-component"
import createElement from "lib/create-element"
import $$ from "lib/constants"

const TWITTER_LOGO = `<svg version="1.1" viewBox="0 0 16 16" fill="#00aced">
  <path d="M16,3.536c-0.589,0.261-1.221,0.438-1.885,0.517c0.678-0.406,1.198-1.05,1.443-1.816c-0.634,0.376-1.337,0.649-2.085,0.797 c-0.599-0.638-1.452-1.037-2.396-1.037c-1.813,0-3.283,1.47-3.283,3.282c0,0.257,0.029,0.508,0.085,0.748 c-2.728-0.137-5.147-1.444-6.766-3.43c-0.283,0.485-0.444,1.049-0.444,1.65c0,1.139,0.579,2.144,1.46,2.732 C1.592,6.963,1.086,6.816,0.643,6.57c0,0.014,0,0.027,0,0.041c0,1.59,1.132,2.917,2.633,3.219C3,9.905,2.71,9.945,2.411,9.945 c-0.212,0-0.417-0.021-0.618-0.059c0.418,1.304,1.63,2.253,3.066,2.28c-1.123,0.88-2.539,1.405-4.077,1.405 c-0.265,0-0.526-0.016-0.783-0.046C1.453,14.456,3.178,15,5.032,15c6.038,0,9.34-5.002,9.34-9.34c0-0.142-0.003-0.284-0.01-0.425 C15.003,4.773,15.56,4.195,16,3.536z"></path>
</svg>`

export default class DownloadStep extends BaseComponent {
  static template = template;

  @autobind
  onEnter() {
    const {downloadURL} = this.$root
    const {downloadLink, icon} = this.refs

    downloadLink.href = downloadURL
    icon.src = this.$root.steps.details.imageUploader.imageURL || $$.DEFAULT_PLUGIN_ICON

    const downloadIframe = createElement("iframe", {
      className: "download-iframe",
      src: downloadURL
    })

    document.body.appendChild(downloadIframe)
  }

  get navigationButtons() {
    const href = [
      "https://twitter.com/intent/tweet/?text=",
      encodeURIComponent("I just created a WordPress plugin in seconds."),
      "&url=",
      encodeURIComponent("http://instantwordpressplugin.com"),
      "&via=EagerIO"].join("")

    return [
      {label: "Create another plugin", handler: this.navigateNext},
      {label: `${TWITTER_LOGO} Share on Twitter`, href, className: "twitter-share"}
    ]
  }

  @autobind
  navigateNext() {
    this.$root.restart()
  }
}
