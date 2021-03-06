import "./embed-code.styl"
import template from "./embed-code.pug"

import autobind from "autobind-decorator"
import BaseComponent from "components/base-component"
import * as demos from "../../application/demos"

export default class EmbedCodeStep extends BaseComponent {
  static template = template;

  title = "Paste your embed code below.";

  render() {
    const element = this.compileTemplate()
    const {embedCodeInput, demoButtons} = this.refs

    demoButtons.forEach(demoButton => demoButton.addEventListener("click", this.navigateDemo))

    embedCodeInput.addEventListener("input", ({target: {value}}) => {
      this.$root.$embedCode = value

      this.syncButtonState()
    })

    return element
  }

  @autobind
  onEnter() {
    this.syncButtonState()
  }

  get navigationButtons() {
    return [
      {label: "Back", handler: this.navigatePrevious},
      {label: "Next", handler: this.navigateNext}
    ]
  }

  @autobind
  navigatePrevious() {
    this.$root.$activeStep = "intro"
  }

  @autobind
  navigateNext() {
    this.$root.$activeStep = "schema"
  }

  @autobind
  navigateDemo({target}) {
    demos[target.dataset.demo](this.$root)
  }

  syncButtonState() {
    const {embedCodeInput} = this.refs
    const {navigationNextButton} = this.$root.refs

    if (!navigationNextButton) return

    navigationNextButton.disabled = embedCodeInput.value.length === 0
  }
}
