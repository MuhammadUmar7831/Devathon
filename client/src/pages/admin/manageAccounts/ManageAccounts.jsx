import React from "react"
import Sidebar from "../../../components/sidebar"
import AccountsTable from "./AccountsTable"

const ManageAccounts = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />

        <div className="p-8 w-full">
          <div className="flex items-center justify-between">
            <div>
              <h6 className="text-xl">
                <b>Manage Customer Support</b>
              </h6>
            </div>
            <button className="bg-gray-900 hover:bg-gray-800 rounded-md text-white py-2 px-4 mt-2 disabled:cursor-not-allowed">
              + Add Resource
            </button>
          </div>
          <div className="py-4">
            <AccountsTable />
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageAccounts
