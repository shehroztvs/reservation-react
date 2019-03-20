import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Footer } from './common';

class Completion extends Component {
    onCompletion() {
        this.props.history.push("/");
    }
    render() {
        return(
            <div className="wrapper has-footer main">
				<div className="main-header">
				    <h1 className="title text-center title-margin">Success</h1>
				</div>
				<div className="card-raised">
                    <div className="row-no-gutters mt-page justify-content-center">
                        <div className="col  col-10 col-md-6 col-lg-4">
                            <div className="row-no-gutters">
                                <div className="col text-center">
                                    <p className="page-heading">
                                        <br />
                                        <br />
                                        Fantastic! Head on over.
                                        Your reservation has been confirmed.
                                        <br />
                                        For further information please contact
                                        <br />
                                        {this.props.propertyPhone}
                                    </p>
                                </div>
                            </div>
                            <div className="row-no-gutters">
                                <div className="col">
                                    <button
                                        className="button-brand btn-block"
                                        onClick={this.onCompletion.bind(this)}
                                    >
                                        Thank you
                                    </button>
                                </div>
                            </div>
                        </div>
					</div>
                    <Footer
						{...this.props}
						progressWidth="100%"
						step="4"
						disablePrevious={true}
						disableNext={true}
					/>
                </div>
			</div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        phone : state.form.phone,
        name: state.form.name,
        propertyId: state.form.propertyId,
        auth: state.form.auth,
        propertyPhone: state.form.propertyPhone
    }
}

export default connect(
    mapStateToProps
)(Completion);
