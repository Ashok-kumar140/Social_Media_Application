import { React, useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

const forgetPassword = () => {
    const [email, setEmail] = useState("");


    const sendEmail = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/sendpasswordlink`, {
                email
            });

            console.log(res);

            if(res.data.error){
                toast.error(res.data.error);

            }
            if(res.data.success){
                toast.success(res.data.success);

            }

        }
        catch (err) {
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
                            <h2>Enter Your Email</h2>

                        </div>

                    </div>

                    <div className="form-group mb-3">
                        <input type="email" className="form-control form-control-lg bg-light fs-6"
                            placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    {/*loading ? <SyncOutlined spin className='py-1' /> : page === "login" ? ("Sign In") : ("Sign Up")*/}
                    <div className="form-group mb-3">
                        <button onClick={sendEmail} className="btn btn-lg btn-primary w-100 fs-6">Send</button>
                    </div>

                </form>

            </div>


        </div >

    )
}

export default forgetPassword;