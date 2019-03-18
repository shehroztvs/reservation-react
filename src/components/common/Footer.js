import React from 'react';
import logo from '../../assets/footer-logo.png'

export const Footer = ({ progressWidth, onPrevious, onNext, disablePrevious, disableNext }) => (
    <footer className="footer">
        <div className="wrapper">
            <div className="progress">
                <div className="progress-bar" style={{ width:progressWidth }}></div>
            </div>
            <div className="row-no-gutters navigation-section">
                <img src={logo} alt="" />
                <div className="powered-by-zuma" style={{ marginLeft:10 }}>
                    <span>Powered by</span>
                    eet
                </div>
                <div className="navigation-buttons">
                    <a onClick={onPrevious} className={disablePrevious ? "disabled" : ""}>
                        <i className="fa fa-angle-up"></i>
                    </a>
                    <a onClick={disableNext ? null : onNext} className={ disableNext ? "disabled" : ""}>
                        <i className="fa fa-angle-down"></i>
                    </a>
                </div>
            </div>
        </div>
    </footer>
);
