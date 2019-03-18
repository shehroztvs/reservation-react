import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { onTimeSelect, availability, setDate } from '../actions';
import { Footer, PageHeading } from './common';
import 'react-datepicker/dist/react-datepicker.css';
import loader from '../assets/loader.gif'
import Modal from 'react-modal';
import TimePicker from 'react-times';
import 'react-times/css/classic/default.css';
import { fire } from './../config';
import SweetAlert from 'sweetalert-react';

let db;

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		width: 250,
		height: 350
  }
};

class TimeOptions extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			isOpen:false,
			modalIsOpen: false,
			reservationTime: '',
			showAlert: false,
			loader: false,
			reservationData: {
				title: '',
				text: ''
			}
		}

		this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
	}

	openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

	componentDidMount() {
		db = fire.database().ref().child('reservations/'+this.props.propertyId);
		this.props.availability(this.props.date, this.props.party, this.props.propertyId);

		db.on('child_changed', (snapshot) => {
			var data = snapshot.val();

			if(data.status === 'rejected') {
				this.setState({
					loader: false,
					showAlert: true,
					reservationData: {
						title: 'Rejected',
						text: 'Your reservation has been rejected.'
					}
				});
			}
		});
	}

	requestRestaurant() {
		db.push({
			client: 'visitor',
			endTime: moment(this.state.reservationTime, 'h:mm:ss A').add(1,'hour').add(30,'minutes').format('HH:mm:ss'),
			partySize: this.props.party,
			startTime: moment(this.state.reservationTime, 'h:mm:ss A').format('HH:mm:ss'),
			status: 'pending',
		});

		this.setState({
			loader: true
		});
	}

	onPrevious() {
		this.props.history.push('/');
	}

	onNext() {
		this.props.history.push('/stepThree');
	}
	
	checkDisable() {
		if(this.props.time === '') {
			return true;
		}
		else {
			return false;
		}
	}

	renderClick(value) {
		this.props.onTimeSelect(value);

		setTimeout(() => {
			this.props.history.push('/stepThree');
		}, 350)
	}
	
	handleChange(date) {
		this.props.setDate(moment(date).format("YYYY-MM-DDT00:00:00"));
		this.toggleCalendar();
	}

	toggleCalendar (e) {
		e && e.preventDefault();
		this.setState({isOpen: !this.state.isOpen})
	}

	renderTimeSlots() {
		if(this.props.loading) {
			return (
			  <div>
					<img
						src={loader}
						alt="Loading"
						style={{
							width: "65%",
							height: "auto",
							marginLeft: "auto",
							marginRight: "auto",
							display: "block"
						}}
					/>
			  </div>
			);
		}	
		else if(this.props.timeSlots !== null && !this.props.loading) {
			var items = this.props.timeSlots.map((value, key) => {
				return(
					<div
						className={`checkbox-wrap ${this.props.time === value.startTime ? "checkbox-wrap-active" : ""}`}
						onClick={() => this.renderClick(value)}
						key={key}>
						<div className="row">
							<div className="form-check w-70">
								<label className="label">
									<input
										className="label__checkbox"
										type="checkbox"
										checked={this.props.time === value.startTime? "checked":""}
									/>
									<span className="label__text">
										<span className="label__check">
											<i className="fa fa-check icon" />
										</span>
									</span>
								</label>
								<label className="form-check-label">
									{moment(value.startTime,"HH:mm:ss").format("LT")}
								</label>
							</div>
							<div
								className="float-right w-30 offer-bg"
								style={{
									display: value.offers.length > 0 ? "" : "none"
								}}
							>
								{value.offers.length > 0 ? value.offers[0].title : ""}
							</div>
						</div>
					</div>
				);
			})
			return items;
		}
	}

	render() {
		return(
			<div className="wrapper has-footer main">
				<div className="main-header">
					<h1 className="title text-center title-margin">Find Table</h1>
				</div>
				<div className="card-raised">
					<div className="row-no-gutters mt-page justify-content-center flex-container h-70vh">
						{this.state.loader === false && 
							<div className="col name-page col-10 col-md-6 col-lg-4">
								<PageHeading heading={`Arrival Time for ${this.props.party}`} />

								<div className="row-no-gutters">
									<div className="col-md-12 col-12 col-xs-12 col-lg-12 h-35">
										{this.renderTimeSlots()} 
									</div>
								</div>
								<div className="row-no-gutters" style={{ display: this.props.loading ? "none" : "" }}>
									<div className="col">
										<button
											className="btn button-brand mt-35"
											onClick={this.openModal}
										>
											Request Restaurant
										</button>
									</div>
								</div>

								<Modal
									isOpen={this.state.modalIsOpen}
									onAfterOpen={this.afterOpenModal}
									onRequestClose={this.closeModal}
									style={customStyles}
									contentLabel="Example Modal"
									ariaHideApp={false}
								>
									<h2 ref={subtitle => this.subtitle = subtitle}>Reservation</h2>
									<TimePicker
										focused 
										closeOnOutsideClick={false}
										onTimeChange={({hour,minute,meridiem })=>{
											this.setState({
												reservationTime:`${hour}:${minute} ${meridiem}`
											}, () => {
												this.requestRestaurant();
											});
										}}
										theme="classic"
										timeMode="12"
										// timeConfig={{
										// 	from:this.renderStartTimeForStart(),
										// 	to: this.renderEndTimeForStart(),
										// 	step: 90,
										// 	unit: 'minutes'
										// }}
										time={this.state.reservationTime !== '' ? this.state.reservationTime : '00:00'}
									/>
								</Modal>

								<SweetAlert
									show={this.state.showAlert}
									title={this.state.reservationData.title ? this.state.reservationData.title : ''}
									text={this.state.reservationData.text}
									showCancelButton={false}
									onConfirm={() => {
											this.setState({
												showAlert: false
											})
											// if(this.state.status==="pending"){
											// 		fire.database().ref('reservations/'+this.state.key).update({
											// 				status: 'confirmed',
											// 				read:'merchant'
											// 		});
											// }
											// this.setState({
											// 		showAlert: false
											// })
											// this.onCompletion();
									}}
									onCancel={() => {
											// fire.database().ref('reservations/'+this.state.key).update({
											// 		status: 'failed',
											// 		read:'merchant'
											// });
											// this.setState({
											// 		showAlert: false
											// })
											// this.onCompletion();
									}}
								/>

								{/* <div className="row-no-gutters" style={{display:this.props.loading?"none":""}}>
									<div className="col">
										<button
											className="btn button-brand mt-35"
											onClick={this.toggleCalendar.bind(this)}
										>
											Change Date
										</button>
										{
											this.state.isOpen && (
												<DatePicker
													onClickOutside={()=>{this.setState({isOpen:!this.state.isOpen})}}
													minDate={moment()}
													maxDate={moment().add(10,"days")}
													selected={moment(this.props.date)}
													onChange={this.handleChange.bind(this)}
													withPortal
													inline
												/>
											)
										}
									</div>
								</div> */}
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
						onPrevious={this.onPrevious.bind(this)}
						onNext={this.onNext.bind(this)}
						progressWidth="50%"
						step="2"
						disablePrevious={false}
						disableNext={this.checkDisable()}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return{
			selectedTime: state.form.selectedTime,
			time : state.form.time,
			party: state.form.party,
			timeSlots: state.form.timeSlots,
			date: state.form.date,
			loading: state.form.loading,
			propertyId: state.form.propertyId
    }
}

export default connect(
	mapStateToProps, 
	{
		onTimeSelect,
		availability,
		setDate
	}
)(TimeOptions)
