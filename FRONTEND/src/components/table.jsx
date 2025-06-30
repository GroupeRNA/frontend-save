import React from 'react'

const Table = ({ keys, title, rows, onChangeSearch, columnAction }) => {
    return (
        <div className="mb-[-40px]">
            <div className="bg-white rounded-lg shadow p-5">
                <div className="flex justify-between items-center mb-5">
                    <div className="relative">
                        <input 
                            placeholder='Recherche' 
                            type="text" 
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            onChange={onChangeSearch} 
                        />
                    </div>
                    <div>{rows.length} resultat(s)</div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {
                                    title.map((item, index) => (
                                        <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {item}
                                        </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {
                                rows.map((row, id) => (
                                    <tr key={id} className="hover:bg-gray-50">
                                    {
                                        keys.map((key, index) => (
                                            <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {row[key]}
                                            </td>
                                        ))
                                    }
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {columnAction(row)}
                                    </td>
                                </tr>
                                ))  
                            }
                        </tbody>
                    </table>
                    <br /><br />
                    <br />
                </div>
            </div>
        </div>
    )
}

export default Table