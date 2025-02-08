import {Link, useOutletContext} from "@remix-run/react";
import {User} from "~/model/user";

export default function Account() {
    const user:User = useOutletContext();

    return (
        <div className="mx-auto">
            <div className="flex justify-between">
                <div className="flex items-center gap-4">
                    <div className="font-medium">
                        <div>{user?.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</div>
                    </div>
                </div>
                <Link to={""}
                      className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout
                </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 my-5">

                <div
                    className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        Parlour Name
                    </h5>
                    <p className="font-normal text-gray-700">{user?.parlourName}</p>
                </div>

                <div
                    className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        Address
                    </h5>
                    <p className="font-normal text-gray-700">{user?.address}, {user?.pinCode}</p>
                </div>

                <div
                    className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        Phone number
                    </h5>
                    <p className="font-normal text-gray-700">{user?.phoneNumber}.</p>
                </div>

            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-12">
                <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-gray-700 bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Sr. No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                        Order Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product purchase
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Points Spent
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Created At
                        </th>
                    </tr>
                    </thead>
                    <tbody className="contracts-table">
                        <tr className="odd:bg-white even:bg-gray-50"
                            key="${ctrId}">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                0
                            </th>
                            <td className="px-6 py-4">
                                1234567890
                            </td>
                            <td className="px-6 py-4">
                                Furniture
                            </td>
                            <td className="px-6 py-4">
                                100
                            </td>
                            <td className="px-6 py-4">
                                20/10/2025
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


        </div>
    );
}