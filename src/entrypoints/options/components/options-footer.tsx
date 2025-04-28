import { memo } from "react"
import { i18n } from "#imports"

function OptionsFooter() {
  return (
    <footer id="options-footer" className="flex justify-center gap-4 text-center underline text-gray-400">
      <a target="_blank" href="https://github.com/brkunver">
        {i18n.t("options.footer.createdByBrkunver")}
      </a>
      <a target="_blank" href="https://brkunver.github.io/llm-toolbox-extension/">
        {i18n.t("options.footer.website")}
      </a>
      <a target="_blank" href="https://github.com/brkunver/llm-toolbox">
        {i18n.t("options.footer.github")}
      </a>
    </footer>
  )
}

export default memo(OptionsFooter)
