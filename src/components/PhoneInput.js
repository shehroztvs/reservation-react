import React from 'react';
import {connect} from 'react-redux';
import {onPhoneSelect} from '../actions';
import {Header,Footer} from './common';
import {fire} from './../config';
import SweetAlert from 'sweetalert-react';
import RenderIf from '../RenderIf';
import loader from '../assets/loader.gif';
import moment from 'moment';

let db;

class PhoneInput extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            value: '',
            showAlert: false,
            data: {},
            loader: false,
            key: null,
            showCancelButton:false,
            status:null
        }
    }

    componentDidMount(){
        db = fire.database().ref().child('reservations');
        db.on('child_changed', (snapshot) => {
            var data = snapshot.val();
            if(data.status){
                this.setState({
                    status:data.status
                })
            }
            if(data.status === 'confirmed'){
                this.setState({
                    loader: false,
                    showAlert: data.phone == this.props.phone ? true : false,
                    data: {
                        title: 'Confirmed',
                        text: data.name+', your reservation has been confirmed at '+moment(data.time,"HH:mm").format("LT")
                    }
                })
            }
            else if(data.status === 'rejected'){
                this.setState({
                    loader: false,
                    showAlert: data.phone == this.props.phone ? true : false,
                    data: {
                        title: 'Rejected',
                        text: data.name+', your reservation has been rejected.'
                    }
                })
            }
            else if(data.status === 'pending'){
                this.setState({
                    loader: false,
                    showAlert: data.phone == this.props.phone ? true : false,
                    data: {
                        title: 'Alternate Time',
                        text: data.name+', there is availability at '+moment(data.time,"HH:mm").format("LT")
                    },
                    showCancelButton:true
                })
            }
            else if(data.status === 'failed'){
                this.setState({
                    loader: false,
                    showAlert: data.phone == this.props.phone ? true : false,
                    data: {
                        title: 'Failed',
                        text: 'Restaurant not responding.'
                    }
                })
            }
        })
    }

	checkDisable(){
        
    }

    onPrevious(){
        this.props.history.push('stepThree')
    }

    onNext(){
        
    }
	
	phoneInput(event){
        var regex = /^[0-9]+$/;
        var value = event.target.value;
        if(regex.test(value) || value === '')
        {
            this.props.onPhoneSelect(value);
        }   
    }
    onSubmit(){
        if(this.props.party && this.props.time && this.props.name && this.props.phone){
            var key = db.push({
                party: this.props.party,
                time: moment(this.props.time).format("LT"),
                name: this.props.name,
                phone: this.props.phone,
                status: 'pending'
            }).getKey();
            this.setState({
                loader: true,
                key
            });
        }
        setTimeout(() => {
            if(this.state.loader){
                fire.database().ref('reservations/'+this.state.key).update({
                    status: 'failed'
                });
                this.setState({
                    loader: false
                });
            }
        }, 60000)
    }

	render(){
        return(
			<div className="wrapper has-footer main">
				<div className="main-header">
				<h1 className="title text-center title-margin">Find Table</h1>
				</div>
				<div className="card-raised">
                    <div className="row-no-gutters mt-page justify-content-center">
                    
                    {RenderIf(this.state.loader === false, 
					<div className="col name-page col-10 col-md-6 col-lg-4">
                        <div className="row-no-gutters">
                            <div className="col text-center">
                                <p className="page-heading">
                                    <br />
                                    <br />
                                    {this.props.party} people @{" "}
                                    {moment(this.props.time).format("LT")}
                                </p>
                                <p className="text-centet">
                                {this.props.name}, just one more step.
                                    <br/>
                                    Enter phone number just in case we'll contact you.
                                </p>
                            </div>
                        </div>
                        <div className="row-no-gutters">
                            <div className="col">
                                <input 
                                    className="input-field" 
                                    onChange={this.phoneInput.bind(this)} 
                                    type="text"
                                    placeholder="Phone"
                                    value={this.props.phone}
                                />
                            
                                <button className={"button-brand btn-block "+(this.props.phone===''?"disabled":"")}  
                                disabled={this.props.phone===''?true:false} 
                                onClick={this.onSubmit.bind(this)}>
                                        Make A Request
                                </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {RenderIf(this.state.loader === true, 
                         <div>
                            <img src={loader} alt="Loading" style={{width:'65%',height:'auto',marginLeft: 'auto',marginRight: 'auto',display: 'block'}} />
                        </div>
                    )}
					</div>
                    <Footer
						{...this.props}
						onPrevious={this.onPrevious.bind(this)}
						onNext={this.onNext.bind(this)}
						progressWidth="100%"
						step="4"
						disablePrevious={false}
						disableNext={true}
					/>
				
                 <SweetAlert
                    show={this.state.showAlert}
                    title={this.state.data.title ? this.state.data.title : ''}
                    text={this.state.data.text}
                    showCancelButton={this.state.showCancelButton}
                    onConfirm={() => {
                        if(this.state.status==="pending"){
                            fire.database().ref('reservations/'+this.state.key).update({
                                status: 'confirmed'
                            });
                        }
                        this.setState({
                            showAlert: false
                        })
                        window.location.href="/";
                    }}
                    onCancel={()=>{
                        fire.database().ref('reservations/'+this.state.key).update({
                            status: 'failed'
                        });
                        this.setState({
                            showAlert: false
                        })
                        window.location.href="/";
                    }}
                /> 
            </div>
			</div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return{
        phone : state.form.phone,
        name: state.form.name,
        party: state.form.party,
        time: state.form.time
    }
}

export default connect(mapStateToProps,{onPhoneSelect})(PhoneInput)