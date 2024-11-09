import { useState } from 'react';

function RegisterForm({ addUser }) {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        age: '',
        monasticYears: '',
        templeAffiliation: '',
        province: '',
        phoneNumber: '',
        chronicIllness: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser(formData);
        setFormData({
            name: '',
            lastName: '',
            age: '',
            monasticYears: '',
            templeAffiliation: '',
            province: '',
            phoneNumber: '',
            chronicIllness: ''
        });
    };

    return (
        <>
            <div className='flex flex-col '>
                <p className='text-md'>ลงทะเบียนพระปริวาส วัดหนองขนากประจำปี พ.ศ. 2567 </p>
                <p>ระหว่างวันที่ 10 - 19 พ.ย. 2567 </p>
            </div>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md space-y-4 max-w-md mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="ชื่อ"
                        className="p-3 border rounded w-full"
                        required
                    />
                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="ฉายา"
                        className="p-3 border rounded w-full"
                        required
                    />
                    <input
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="อายุ"
                        className="p-3 border rounded w-full"
                        type="number"
                        required
                    />
                    <input
                        name="monasticYears"
                        value={formData.monasticYears}
                        onChange={handleChange}
                        placeholder="พรรษา"
                        className="p-3 border rounded w-full"
                        type="number"
                    />
                    <input
                        name="templeAffiliation"
                        value={formData.templeAffiliation}
                        onChange={handleChange}
                        placeholder="สังกัดวัด"
                        className="p-3 border rounded w-full"
                        required
                    />
                    <input
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        placeholder="จังหวัด"
                        className="p-3 border rounded w-full"
                        required
                    />
                    <input
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="เบอร์"
                        className="p-3 border rounded w-full"
                        type="tel"
                        required
                    />
                    <input
                        name="chronicIllness"
                        value={formData.chronicIllness}
                        onChange={handleChange}
                        placeholder="โรคประจำตัว (ถ้ามี)"
                        className="p-3 border rounded w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </>
    );
}

export default RegisterForm;
