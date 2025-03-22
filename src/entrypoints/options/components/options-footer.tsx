import { memo } from "react"

function OptionsFooter() {
  return (
    <footer id="options-footer" className="flex justify-center gap-4 text-center underline text-gray-400">
      <a target="_blank" href="https://github.com/brkunver">
        Created by Brkunver
      </a>
      <a target="_blank" href="#">
        Help
      </a>
      <a target="_blank" href="https://github.com/brkunver/llm-toolbox">
        GitHub
      </a>
    </footer>
  )
}

export default memo(OptionsFooter)
