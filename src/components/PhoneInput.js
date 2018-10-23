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
                    showAlert: true,
                    data: {
                        title: 'Confirmed',
                        text: data.name+', your reservation has been confirmed at '+moment(data.time,"HH:mm").format("LT")
                    }
                })
            }
            else if(data.status === 'rejected'){
                this.setState({
                    loader: false,
                    showAlert: true,
                    data: {
                        title: 'Rejected',
                        text: data.name+', your reservation has been rejected.'
                    }
                })
            }
            else if(data.status === 'pending'){
                this.setState({
                    loader: false,
                    showAlert: true,
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
                    showAlert: true,
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
	
	phoneInput(value){
        this.props.onPhoneSelect(value);

        if(this.props.party && this.props.time && this.props.name && value){
            var key = db.push({
                party: this.props.party,
                time: this.props.time,
                name: this.props.name,
                phone: value,
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
			<div className="wrapper has-footer">
                	<Header/>
                    <div className="row-no-gutters mt-page justify-content-center">
                    
                    {RenderIf(this.state.loader === false, 
					<div className="col name-page col-10 col-md-6 col-lg-4">
                        <div className="row-no-gutters">
                            <div className="col text-center">
                                <p className="page-heading">Phone:</p>
                            </div>
                        </div>
                        <div className="row-no-gutters">
                            <div className="col">
                                <input className="input-field" onChange={(value) => {this.setState({value: value.target.value})}} type="number"/>
                            
                                <button className={"button-brand btn-block "+(this.state.value===''?"disabled":"")}  
                                disabled={this.state.value===''?true:false} 
                                onClick={this.phoneInput.bind(this, this.state.value)}>
                                        Make A Request
                                </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {RenderIf(this.state.loader === true, 
                         <div >
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
                        
                    }}
                    onCancel={()=>{
                        fire.database().ref('reservations/'+this.state.key).update({
                            status: 'failed'
                        });
                        this.setState({
                            showAlert: false
                        })
                    }}
                /> 
			</div>
        );

    }
}

const mapStateToProps = (state) => {
    return{
        phone : state.form.phone,
        name: state.form.name,
        party: state.form.party,
        time: state.form.time.hour+':'+state.form.time.minute+' '+state.form.time.meridiem
    }
}

export default connect(mapStateToProps,{onPhoneSelect})(PhoneInput)