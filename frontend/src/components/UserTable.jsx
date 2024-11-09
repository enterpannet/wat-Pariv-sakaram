function UserTable({ users, deleteUser }) {
    return (
        <div className="mt-8 bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Registered Users</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">ชื่อ</th>
                        <th className="p-2 border">ฉายา</th>
                        <th className="p-2 border">อายุ</th>
                        <th className="p-2 border">พรรษา</th>
                        <th className="p-2 border">สังกัดวัด</th>
                        <th className="p-2 border">จังหวัด</th>
                        <th className="p-2 border">เบอร์</th>
                        <th className="p-2 border">โรคประจำตัว</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="p-2 border">{user.name}</td>
                            <td className="p-2 border">{user.lastName}</td>
                            <td className="p-2 border">{user.age}</td>
                            <td className="p-2 border">{user.monasticYears}</td>
                            <td className="p-2 border">{user.templeAffiliation}</td>
                            <td className="p-2 border">{user.province}</td>
                            <td className="p-2 border">{user.phoneNumber}</td>
                            <td className="p-2 border">{user.chronicIllness}</td>
                            <td className="p-2 border">
                                <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                <button onClick={() => deleteUser(index)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;