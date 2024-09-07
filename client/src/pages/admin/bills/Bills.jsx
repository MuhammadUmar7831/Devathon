import React from "react"
import BillTable from "./BillTable"

const Bills = () => {
  return (
    <>
      <div class="w-full p-8 flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <div>
            <h6 className="text-xl">
              <b>Search Bills</b>
            </h6>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              class="rounded-lg block p-2 border border-gray-900 text-gray-900"
              placeholder="Search"
              required
            />
            <button className="bg-gray-900 hover:bg-gray-800 rounded-md text-white p-2 disabled:cursor-not-allowed">
              Search
            </button>
          </div>
        </div>
        <div className="">
          <BillTable />
        </div>
      </div>
    </>
  )
}

export default Bills
