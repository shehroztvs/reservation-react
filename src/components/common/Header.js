import React from 'react';
import logo from '../../assets/logo.jpg';

export const Header =(props)=>{
    return(<div className="row-no-gutters justify-content-center">
    <div className="client-logo">
        <img src={logo} alt=""/>
    </div>
</div>
);
}
