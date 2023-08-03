import {React,useContext} from 'react';
import { UserContext } from '../context';

export default function Home() {

    const [state,setState] = useContext(UserContext);
    
    return (
        <div className='container'>
            <div className='row'>
                <div className="col">
                    <h1>HOME PAGE</h1>
                    <img src="/images/default.jpg" alt="not found" />

                </div>
            </div>
        </div>
    );
}
