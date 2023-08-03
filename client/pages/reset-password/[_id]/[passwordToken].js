import { React, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

const Resetpassword = () => {
    const [newPassword, setNewPassword] = useState("");

    // const navigate = useNavigate();

    const router = useRouter();
    const _id = router.query._id;
    const passwordToken = router.query.passwordToken;

    // console.log(_id, passwordToken)
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        // validUser();
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/${_id}/${passwordToken}`, {
                newPassword
            });
            // console.log(data);
            if(data.success){
                toast.success(data.success);
                router.push('/login');
            }
            if(data.error){
                toast.error(data.error);
            }

        } catch (err) {
            console.log(err);
        }

    }



    return (
        <div style={{ backgroundColor: "#8091c3" }} className=" d-flex justify-content-center align-items-center min-vh-100">
            <div style={{ backgroundColor: 'white', padding: "40px", boxShadow: " 0 0 15px -10px #2d3748" }} className='border rounded-5 bg-white shadow '>
                {/*--------------------- Login Container ------------------------*/}

                <form className="row align-items-center " >
                    <div className="header-text mb-4">

                        <div className='text-center'>
                            <h2>Enter Your New Password</h2>

                        </div>

                    </div>

                    <div className="form-group mb-3">
                        <input type="password" className="form-control form-control-lg bg-light fs-6"
                            placeholder="Enter our new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    {/*loading ? <SyncOutlined spin className='py-1' /> : page === "login" ? ("Sign In") : ("Sign Up")*/}
                    <div className="form-group mb-3">
                        <button onClick={handleUpdate} className="btn btn-lg btn-primary w-100 fs-6">Update</button>
                    </div>

                </form>

            </div>


        </div >

    )
}

export default Resetpassword;
