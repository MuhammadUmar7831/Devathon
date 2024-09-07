import React from "react"
import { BarLoader } from "react-spinners"

const CustomLoader = (props) => {
  const { loadingText } = props
  return (
    <>
      <div className="flex flex-col h-screen items-center justify-center gap-5">
        <div className="flex gap-2 animate-pulse">
          {/* TODO: Add Logo */}
          <h1 className="text-2xl">LESCO</h1>
        </div>
        <BarLoader width={200} />
        <span className="animate-pulse">{loadingText}</span>
      </div>
    </>
  )
}

export default CustomLoader
