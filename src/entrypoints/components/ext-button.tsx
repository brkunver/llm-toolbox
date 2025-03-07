import logo from "~/assets/128.png"

interface ExtButtonProps {
  showMenu: boolean
  onMenuButtonClick: () => void
}

function ExtButton({ showMenu, onMenuButtonClick }: ExtButtonProps) {
  return (
    <div id="ext-button" className="fixed top-14 right-14 z-30 w-fit h-fit group font-main">
      <div
        className={`${
          showMenu ? "bg-flat-red" : "bg-flat-green"
        } absolute inset-0 rounded-2xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-200 -z-10`}
      />
      <button
        type="button"
        onClick={onMenuButtonClick}
        className="w-fit h-fit p-2 cursor-pointer rounded-2xl bg-primary border-solid border-1 border-border hover:border-transparent transition-all"
      >
        <img src={logo} alt="toggle-menu" className="text-white w-10 h-10 mb-2 ml-2" />
      </button>
    </div>
  )
}

export default ExtButton
