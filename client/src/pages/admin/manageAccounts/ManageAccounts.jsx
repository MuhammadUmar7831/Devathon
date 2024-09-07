import React from "react"
import AccountsTable from "./AccountsTable"
import { Link } from "react-router-dom"
import Sidebar from "../../../components/sidebar"

const ManageAccounts = () => {
  return (
    <>
      <div className="px-8 py-6 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h6 className="text-xl">
              <b>Manage Customer Support</b>
            </h6>
          </div>
          <Link
            to="/admin/addCustomerSupport"
            className="bg-gray-900 hover:bg-gray-800 rounded-md text-white py-2 px-4 mt-2 disabled:cursor-not-allowed"
          >
            + Add
          </Link>
        </div>
        <div className="py-4">
          <AccountsTable />
        </div>
      </div>
    </>
  )
}

export default ManageAccounts
