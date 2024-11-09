import { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
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
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://210.246.215.231:5000/api/v1/users', formData);
            setPopupMessage('Registration successful!');
            setIsSuccess(true);
        } catch (error) {
            console.error('Error submitting form:', error);
            setPopupMessage('Registration failed. Please try again.');
            setIsSuccess(false);
        }
        setShowPopup(true);
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
            {showPopup && (
                <div className="fixed top-0 left-0 right-0 flex items-center justify-center h-screen bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-lg text-center">
                        <p className={isSuccess ? 'text-green-500' : 'text-red-500'}>{popupMessage}</p>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <div className='flex flex-col justify-center items-center'>
                <p className='text-md'>ลงทะเบียนพระปริวาส วัดหนองขนากประจำปี พ.ศ. 2567</p>
                <p>ระหว่างวันที่ 10 - 19 พ.ย. 2567</p>
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
