import { React, useContext } from 'react';
import { UserContext } from '../../context';
import UserRoute  from '../../components/routes/UserRoute'
export default function dashboard() {

    const [state, setState] = useContext(UserContext);
    return (
        <UserRoute>
            <div className='container'>
                <div className="row">
                    <div className="col">
                        <h1 className="display-1 text-center">Dashboard Page</h1>
                    </div>
                </div>

            </div>
        </UserRoute>
    )
}
