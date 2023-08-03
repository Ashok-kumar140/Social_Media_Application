import { React } from 'react';
import { useRouter } from "next/router";
import axios from 'axios'

export default function EmailVerify() {

    const router = useRouter();
    const _id = router.query._id;
    const emailToken = router.query.emailToken;


    const handleOnclick = async (req, res) => {

        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/users/${_id}/verify/${emailToken}`, {
                emailToken, _id
            });
            console.log(data)

        } catch (err) {
            console.log(err);
        }
        router.push('/login');
    }

    return (
        <div className="container d-flex justify-content-center pt-5">
            
            <div className='mt-100'>
                <h3 className='text-success'>You have successfully verified your email</h3>
                <div className='d-flex justify-content-center pt-5'>
                    <img src="/images/success.png" alt="" style={{ width: 150, height: 150 }} />
                </div>
                <div className='pt-3'>
                    <p>Now you can login using below button...</p>
                </div>
                <div className='d-flex justify-content-center pt-2'>
                    <button onClick={handleOnclick} className="btn btn-primary">Login</button>
                </div>

            </div>
        </div>
    )
}
