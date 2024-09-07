import React from "react"

const AddCustomerSupport = () => {
  return (
    <>
      <div class="w-full p-8 flex flex-col gap-16">
        <div className="flex items-center justify-between">
          <div>
            <h6 className="text-xl">
              <b>Add Customer Support</b>
            </h6>
          </div>
        </div>
        <form class="mx-auto py-4 w-2/5">
          {/* Name */}
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="text"
              class="rounded-lg block w-full p-2.5 border"
              placeholder="Name"
              required
            />
          </div>
          {/* Email */}
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="email"
              class="rounded-lg block w-full p-2.5 border"
              placeholder="Email"
              required
            />
          </div>
          {/* Password */}
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="password"
              class="rounded-lg block w-full p-2.5 border"
              placeholder="Password"
              required
            />
          </div>
          {/* Salary */}
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="cpassword"
              class="rounded-lg block w-full p-2.5 border"
              placeholder="Confirm Password"
              required
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              className="bg-gray-900 hover:bg-gray-800 rounded-md text-white py-2 px-4 mt-2 w-full bg-orange disabled:cursor-not-allowed"
              type="submit"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddCustomerSupport
