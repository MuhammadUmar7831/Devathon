import React from "react"

const AccountsTable = () => {
  return (
    <>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-left rtl:text-right">
          <thead class="text-white bg-gray-900">
            <tr>
              <th scope="col" class="px-6 py-3">
                ID
              </th>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>

              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:border-gray-700 ">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                1
              </th>
              <td class="px-6 py-4">Huzaifa Rizwan</td>
              <td class="px-6 py-4">huzaifa.rizwan1231@gmail.com</td>

              <td class="px-6 py-4">
                <a class="font-medium text-red-600 hover:underline cursor-pointer">
                  Delete
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <nav
          class="px-4 text-base h-12 flex items-center flex-column flex-wrap md:flex-row justify-between py-1"
          aria-label="Table navigation"
        >
          <span class=" font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing <span class="font-semibold text-gray-900">10</span> records{" "}
          </span>
        </nav>

        {false && (
          <div className="text-center text-sm px-6 py-10 font-medium text-gray-900 whitespace-nowrap">
            <h2>There are no records to display</h2>
          </div>
        )}
      </div>
    </>
  )
}

export default AccountsTable
