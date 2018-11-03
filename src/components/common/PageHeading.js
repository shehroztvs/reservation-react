import React from 'react';
export const PageHeading =({heading}) =>{
    return(
            <div className="row-no-gutters">
                <div className="col text-center">
                    <p className="page-heading"> {heading} </p>
                </div>
            </div>
        
    );

}