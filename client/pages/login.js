import { React, useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';

import { SyncOutlined } from '@ant-design/icons';
import AuthForm from '../components/forms/AuthForm';
import { useRouter } from 'next/router';
import { UserContext } from '../context';




export default function login() {

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [state, setState] = useContext(UserContext);

    const router = useRouter();

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // console.log({name,email,password,secret});
            setLoading(true);
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/login`,{
                email,password
            });
            setState({
                user: data.user,
                token: data.token,
            })
            // console.log("data==>", data);
            if (data.error) {
                toast.error(data.error);
                setLoading(false);
            }
            else {

                // updating context
                setState({
                    user: data.user,
                    token: data.token,

                });
                //saving in local storage
                window.localStorage.setItem('auth', JSON.stringify(data));

                router.push("/");
            }

        } catch (err) {
            toast.error(err.response.data);
            console.log(err);
            setLoading(false);
        }

    };
    if(state && state.token) router.push("/")

    return (
        <div style={{ backgroundColor: "#8091c3" }}>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                {/*--------------------- Login Container ------------------------*/}
                <div className="row border rounded-5 p-3 bg-white shadow box-area">
                    {/*------------------------- Left Box ---------------------------*/}
                    <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box img-login" >


                    </div>
                    {/*------------------ ------ Right Box --------------------------*/}
                    <div onSubmit={handleSubmit} className="col-md-6 right-box">
                        <AuthForm

                            email={email}
                            setEmail={setEmail}
                            loading={loading}
                            handleSubmit={handleSubmit}
                            password={password}
                            setPassword={setPassword}
                            page="login" />
                    </div>
                </div>

            </div>


        </div >
    )
}
