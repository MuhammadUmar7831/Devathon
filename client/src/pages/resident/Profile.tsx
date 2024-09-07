import React from 'react'

export default function Profile() {
    return (
        <div className="mt-16 flex flex-col justify-center items-center text-center w-full h-full">
            <img className="inline-flex object-cover border-4 border-gray-900 rounded-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-gray-900/100 bg-indigo-50 text-gray-900 aspect-square w-56" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwyfHxoZWFkc2hvdHxlbnwwfDB8fHwxNjk1ODE3MjEzfDA&ixlib=rb-4.0.3&q=80&w=1080" alt="" />
            <h1 className="text-2xl text-gray-500 font-bold mt-2">
                Johh Doe
            </h1>
        </div>
    )
}
