import React from "react"

const BillTable = () => {
  return (
    <>
      {" "}
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-left rtl:text-right">
          <thead class="text-white bg-gray-900">
            <tr>
              <th scope="col" class="px-6 py-3">
                ID
              </th>
              <th scope="col" class="px-6 py-3">
                Resident
              </th>
              <th scope="col" class="px-6 py-3">
                Month
              </th>
              <th scope="col" class="px-6 py-3">
                Units
              </th>
              <th scope="col" class="px-6 py-3">
                Due Date
              </th>
              <th scope="col" class="px-6 py-3">
                Total
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Actions
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
              <td class="px-6 py-4">September</td>
              <td class="px-6 py-4">100</td>
              <td class="px-6 py-4">07/10/24</td>
              <td class="px-6 py-4">Rs. 10000</td>
              <td class="px-6 py-4">Unpaid</td>

              <td class="px-6 py-4">
                <a class="font-medium text-blue-600 hover:underline cursor-pointer">
                  Download
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

export default BillTable
