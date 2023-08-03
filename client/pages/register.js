import { React, useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Modal } from 'antd';
import Link from 'next/link';
import { SyncOutlined } from '@ant-design/icons';
import AuthForm from '../components/forms/AuthForm';
import { UserContext } from '../context';
import { useRouter } from 'next/router';

export default function register() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [ok, setOk] = useState(false)

    const [state,setState] = useContext(UserContext);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // console.log({name,email,password,secret});
            setLoading(true);
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`,
                {
                    name,
                    email,
                    password,
                });
            // console.log("data==>", data);
            if (data.error) {
                toast.error(data.error);

                setLoading(false);
            }
            else {
                toast.success(data.message)
                setName('');
                setEmail('');
                setPassword('');
                setOk(data.ok);
                setLoading(false);
            }
        } catch (err) {
            // toast.error(err.response.data);
            console.log(err);
            setLoading(false);
        }

    };

    if (state && state.token) router.push("/")


    return (
        <div style={{ backgroundColor: "#8091c3" }}>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                {/*--------------------- Login Container ------------------------*/}
                <div className="row border rounded-5 p-3 bg-white shadow box-area">
                    {/*------------------------- Left Box ---------------------------*/}
                    <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box img-register" >


                    </div>
                    {/*------------------ ------ Right Box --------------------------*/}
                    <div onSubmit={handleSubmit} className="col-md-6 right-box">
                        <AuthForm
                            name={name}
                            email={email}
                            setName={setName}
                            setEmail={setEmail}
                            loading={loading}
                            handleSubmit={handleSubmit}
                            password={password}
                            setPassword={setPassword} />
                    </div>
                </div>



                <div div className="row">
                    <div className="col">
                        <Modal title="" visible={ok} onCancel={() => { setOk(false) }} footer={null}>
                            <p>Email is sent to your Gmail account. Please verify it for further processing.</p>
                        </Modal>
                    </div>
                </div>
            </div>


        </div >
    )
}
