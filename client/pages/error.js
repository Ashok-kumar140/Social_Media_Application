import React from 'react'

const error = () => {
    return (
        <>
            <div className='d-flex justify-content-center ' style={{fontSize:'80px'}}>
                <p style={{margin:'0px'}}>404</p>
            </div>
            <div className='d-flex justify-content-center ' style={{fontSize:'40px',margin:0}}>
                <p style={{margin:'0px'}}>Not Found</p>
            </div>
            <div className='d-flex justify-content-center text-danger' >
            <p>This page isn't supporting now please try again...</p>
            </div>
           
            

        </>
    )
}

export default error;
