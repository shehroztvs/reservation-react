import React from 'react';
import { connect } from 'react-redux';
import { onPhoneSelect, reservation, onCompletion } from '../actions';
import { Footer } from './common';
import { fire } from './../config';
import SweetAlert from 'sweetalert-react';
import RenderIf from '../RenderIf';
import loader from '../assets/loader.gif';
import moment from 'moment';

let db;

class PhoneInput extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            value: '',
            showAlert: false,
            data: {},
            loader: false,
            key: null,
            showCancelButton:false,
            status:null,
            title:''
        }
    }

    componentDidMount() {
        db = fire.database().ref().child('reservations/'+this.props.propertyId);
        // db.on('child_changed', (snapshot) => {        
        //     var data = snapshot.val();
        //     if(data.read==='client'){
        //         if(data.status){
        //             this.setState({
        //                 status:data.status
        //             });
        //         }
        //         if(data.status === 'confirmed'){
        //             this.setState({
        //                 loader: false,
        //                 showAlert: data.phone === this.props.phone ? true : false,
        //                 data: {
        //                     title: 'Confirmed',
        //                     text: data.name+', your reservation has been confirmed at '+moment(data.time,"HH:mm").format("LT")
        //                 }
        //             });
        //         }
        //         else if(data.status === 'rejected'){
        //             this.setState({
        //                 loader: false,
        //                 showAlert: data.phone === this.props.phone ? true : false,
        //                 data: {
        //                     title: 'Rejected',
        //                     text: data.name+', your reservation has been rejected.'
        //                 }
        //             });
        //         }
        //         else if(data.status === 'pending'){
                    // this.setState({
                    //     loader: false,
                    //     showAlert: data.phone === this.props.phone ? true : false,
                    //     data: {
                    //         title: 'Alternate Time',
                    //         text: data.name+', there is availability at '+moment(data.time,"HH:mm").format("LT")
                    //     },
                    //     showCancelButton:true
                    // });
        //         }
        //         else if(data.status === 'failed'){
        //             this.setState({
        //                 loader: false,
        //                 showAlert: data.phone === this.props.phone ? true : false,
        //                 data: {
        //                     title: 'Failed',
        //                     text: 'Restaurant not responding.'
        //                 }
        //             });
        //         }
        //     }
        // });
    }

    onPrevious(){
        this.props.history.push('stepThree')
    }

    onNext(){}
	
	phoneInput(event){
        var regex = /^[0-9]+$/;
        var value = event.target.value;
        if(regex.test(value) || value === '')
        {
            this.props.onPhoneSelect(value);
        }   
    }

    onSubmit(){
        db = fire.database().ref().child('reservations/'+this.props.propertyId);
        if(this.props.type === null){
            this.props.reservation(
                this.props.name,
                this.props.time,
                this.props.party,
                this.props.phone,
                this.props.propertyId,
                this.props.promotionId,
                this.props.endTime,
                this.props.type!==null ? 'custom' : 'default'
            );
            this.props.history.push('/completion');
        }
        
        if(this.props.party && this.props.time && this.props.name && this.props.phone){
            this.setState({
                loader: true
            });
            var key = db.push({
                client: 'visitor',
                startTime: this.props.time,
                endTime: this.props.endTime,
                partySize: this.props.party,
                name: this.props.name,
                phone: this.props.phone,
                type: this.props.type!==null ? 'custom' : 'default',
                status: this.props.type!==null ? 'pending' : 'confirmed',
            }).getKey();
            fire.database().ref('reservations/'+this.props.propertyId).on('child_changed', (snapshot)=>{
                if(snapshot.key === key && snapshot.val().client === 'merchant'){
                    let title,text;
                    if(snapshot.val().status === 'pending'){
                        title='Alternate Time'
                        text=`We have an alternate time at ${moment(snapshot.val().startTime,'HH:mm:ss').format('LT')}.`
                        this.setState({showCancelButton:true})
                    }else if(snapshot.val().status === 'rejected'){
                        title='Rejected'
                        text='Sorry We have no Availability!' 
                    }else{
                        title='Confirmed'
                        text=`Reservation is available at ${moment(snapshot.val().startTime,'HH:mm:ss').format('LT')}.`
                    }
                    this.setState({
                        data: snapshot.val(),
                        showAlert: true,
                        loader: false,
                        key: snapshot.key,title,text
                    })
                }
            });
        }
    }

    // onCompletion() {
    //     this.props.onCompletion(this.props.propertyId, this.props.auth);
    //     this.props.history.push("/");
    // }

	render() {
        return(
			<div className="wrapper has-footer main">
				<div className="main-header">
				    <h1 className="title text-center title-margin">Find Table</h1>
				</div>
				<div className="card-raised">
                    <div className="row-no-gutters mt-page justify-content-center">
                        {this.state.loader === false &&
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
                                        <button
                                            className={
                                                "button-brand btn-block"+(this.props.phone === '' ? "disabled" : "")
                                            }  
                                            disabled={this.props.phone === '' ? true : false} 
                                            onClick={this.onSubmit.bind(this)}
                                        >
                                            Make A Request
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }
                        {this.state.loader === true &&
                            <div>
                                <img
                                    src={loader}
                                    alt="Loading"
                                    style={{
                                        width:'65%',
                                        height:'auto',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        display: 'block'
                                    }}
                                />
                            </div>
                        }
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
                        title={this.state.title ? this.state.title : ''}
                        text={this.state.text}
                        showCancelButton={this.state.showCancelButton}
                        onConfirm={() => {
                            if(this.state.data.status === 'pending'){
                            fire.database().ref('reservations/'+this.props.propertyId+'/'+this.state.key).update({
                                status: 'confirmed',
                                read:'visitor'
                            });
                            this.props.reservation(
                                this.props.name,
                                this.state.data.startTime,
                                this.props.party,
                                this.props.phone,
                                this.props.propertyId,
                                null,
                                this.state.data.endTime,
                                'custom'
                            );
                            }
                            this.setState({
                                showAlert: false
                            },async()=>{
                            if(this.state.data.status ==='confirmed'){
                                await this.props.reservation(
                                    this.props.name,
                                    this.props.time,
                                    this.props.party,
                                    this.props.phone,
                                    this.props.propertyId,
                                    this.props.promotionId,
                                    this.props.endTime,
                                    'custom'
                                );
                                await this.props.history.push('/completion')
                            }else{
                                this.props.history.push('/stepTwo')
                            }
                        })
                            // this.onCompletion();
                        }}
                        onCancel={()=>{
                            fire.database().ref('reservations/'+this.props.propertyId+'/'+this.state.key).update({
                                status: 'rejected',
                                read:'visitor'
                            });
                            this.setState({
                                showAlert: false
                            })
                            // this.onCompletion();
                        }}
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
        party: state.form.party,
        time: state.form.time,
        propertyId: state.form.propertyId,
        auth: state.form.auth,
        promotion: state.form.offer,
        endTime: state.form.endTime,
        promotionId: state.form.promotionId,
        type: state.form.type
    }
}

export default connect(
    mapStateToProps,
    {
        onPhoneSelect,
        reservation,
        onCompletion
    }
)(PhoneInput);
