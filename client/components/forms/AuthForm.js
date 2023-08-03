import React from 'react';
import { SyncOutlined } from '@ant-design/icons';


export default function AuthForm({ name, setName,
    email, setEmail,
    password, setPassword,
    handleSubmit,
    loading, page
}) {

    return (
        <>
            <form className="row align-items-center">
                <div className="header-text mb-4">
                    {page === "login" ? (
                        <div>
                            <h2>Welcome Back</h2>
                            <p>we are happy to see you again</p>

                        </div>

                    ) : (
                        <div>

                            <h2>Welcome Here</h2>
                            <p>Start your happy journey</p>
                        </div>

                    )}
                </div>
                {page !== "login" && <div className="form-group mb-3">
                    <input type="text" className="form-control form-control-lg bg-light fs-6"
                        placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>}
                <div className="form-group mb-3">
                    <input type="email" className="form-control form-control-lg bg-light fs-6"
                        placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group mb-3">
                    <input type="password" className="form-control form-control-lg bg-light fs-6"
                        placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>


                <div className="form-group mb-3">
                    <button disabled={page === "login" ? (!email || !password) : (!name || !email || !password)} onClick={handleSubmit} className="btn btn-lg btn-primary w-100 fs-6">{loading ? <SyncOutlined spin className='py-1' /> : page === "login" ? ("Sign In") : ("Sign Up")}</button>
                </div>
                <div className="form-group mb-3">
                    <button className="btn btn-lg btn-light w-100 fs-6"><img src="images/googleLogo.png" style={{ width: 20 }} className="me-2" /><small>{page === "login" ? ("Sign In with Google") : ("Sign Up with Google")}</small></button>
                </div>
                <div className="row">
                    <small>{page === "login" ? ("Don't have an account?") : ("Already have an account?")}{" "}<a href={`/${page === "login" ? ("register") : ("login")}`}>{page === "login" ? ("Register") : ("Login")}</a></small>
                </div>
                <div className="row">
                    <small>{page === "login" ? ("Forgot password?") : ("")}{" "}<a href={`/${page === "login" ? ("forget-password") : ("")}`}>{page === "login" ? ("Click Here") : ("")}</a></small>
                </div>
            </form>

        </>
    )
}
