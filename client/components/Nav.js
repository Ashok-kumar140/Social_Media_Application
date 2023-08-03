import { React, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { UserContext } from '../context';
import { useRouter } from 'next/router';

export default function Nav() {

    const [state, setState] = useContext(UserContext);
    const [current, setCurrent] = useState("");



    const router = useRouter();

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);

    }, [process.browser && window.location.pathname]);
    

    const logout = () => {
        window.localStorage.removeItem("auth");
        setState(null);
        router.push("/login");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className={`nav-link ${current==='/' && "active"}`} aria-current="page" href="/">Home</Link>
                            {state === null ? (
                                <>
                                    <Link className={`nav-link ${current==='/login' && "active"}`}  href="/login">Login</Link>
                                    <Link className={`nav-link ${current==='/register' && "active"}`}  href="/register">Signup</Link>

                                </>
                            ) : (
                                <>
                                    <a className="nav-link" onClick={logout}>Logout</a>
                                    <Link className={`nav-link ${current==='/users/dashboard' && "active"}`}  href="/users/dashboard">{state && state.user && state.user.name}</Link>

                                </>
                            )}



                        </div>
                    </div>
                </div>
            </nav>




        </>
    )
}
