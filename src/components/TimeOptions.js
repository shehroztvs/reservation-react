import React from 'react';
import TimePicker from 'react-times';
import 'react-times/css/classic/default.css';
import moment from 'moment';
import {connect} from 'react-redux';
import {onTimeSelect, availability, setDate} from '../actions';
import {Footer, Header,PageHeading} from './common';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import loader from '../assets/loader.gif'

class TimeOptions extends React.Component{
	
	constructor(props){
		super(props);
		this.state ={
			showTimeModal: false,
			isOpen:false
		}
	}

	componentDidMount(){
		this.props.availability(this.props.date);
	}

	componentWillReceiveProps(props){
		if(this.props.date!== props.date){
			this.props.availability(props.date);	
		}
		
	}

	onPrevious(){
        this.props.history.push('/');
    }

    onNext(){
		this.props.history.push('/stepThree');
	}
	
	checkDisable(){
		if(this.props.time===''){
            return true;
        }
        else{
            return false;
		}
	}

	onTimeButtonClick(minutesToAdd,selectedButton){
		var hours;
		var minutes;
		var meridiem;
		var options = {};

		var newDateObj = moment().add(minutesToAdd, 'minutes');
		
		hours = newDateObj.format('hh');
		minutes = newDateObj.format('mm');
		meridiem = newDateObj.format('A');
		options = {hour: hours, minute: minutes, meridiem: meridiem};
		if(options){
			this.props.onTimeSelect(options,selectedButton);
			setTimeout(() => {
				this.props.history.push('/stepThree');
			}, 200)
		}
	}

	onTimeChange(selectedButton,options) {

		this.props.onTimeSelect(options,selectedButton);

		setTimeout(() => {
			this.props.history.push('/stepThree');
		}, 200)
	}

	showTimeModal(){
		let time = `${moment().format('hh')}:00 ${moment().format('a')}`
		if(this.props.selectedTime === 4){
			return(
				<TimePicker 
					timeConfig = {{
						from: time,
						step: 30,
						unit: 'minutes'
					}}
					
					timeMode="12"
					theme="classic"
					onTimeChange={this.onTimeChange.bind(this,4)}
					time = {this.props.time?`${this.props.time.hour}:${this.props.time.minute} ${this.props.time.meridiem}`:time}
				/>
			);
		}
		else if(this.state.showTimeModal){
			return(
				<TimePicker 
					focused={true}
					
					timeConfig = {{
						from: time,
						step: 30,
						unit: 'minutes'
					}}
					timeMode="12"
					theme="classic"
					onTimeChange={this.onTimeChange.bind(this,4)}
					time = {this.props.time?`${this.props.time.hour}:${this.props.time.minute} ${this.props.time.meridiem}`:time}
				/>
			)
		}
		else{
			return(
				<button className="button-brand btn-block" onClick={this.openTimeModal.bind(this)}>
					Other
                </button> 
				
			);
					
		}
	}

	openTimeModal(){
		this.setState({
			showTimeModal: true
		})
	}
	renderClick(value){
		this.props.onTimeSelect(value);
		setTimeout(() => {
			this.props.history.push('/stepThree');
		}, 350)
	}
	
	handleChange(date) {
		this.props.setDate(moment(date).format("YYYY-MM-DDT00:00:00"));
		// if(date===moment()){
		// 	this.props.setDate(moment().format());
		// }
		// else{
		// 	this.props.setDate(moment(date).format("YYYY-MM-DDT00:00:00"));
		// 	console.log(this.props.date);
		// }
		this.toggleCalendar();
	}

	toggleCalendar (e) {
	e && e.preventDefault();
	this.setState({isOpen: !this.state.isOpen})
	}

	renderTimeSlots(){
		if (this.props.loading) {
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
		else if(this.props.timeSlots !== null && !this.props.loading ){
			var items = this.props.timeSlots.map((value, key) => {
				return(
					<div className={`checkbox-wrap ${this.props.time === value.timeSlot? "checkbox-wrap-active":""}`} onClick={()=>{this.renderClick(value)}}
					key={key}>
						<div className="row">
							<div className="form-check w-70">
								<label className="label">
									<input className="label__checkbox" type="checkbox"  checked={this.props.time === value.timeSlot? "checked":""} onChange={() => console.log('changed')}/>
									<span className="label__text">
										<span className="label__check">
											<i className="fa fa-check icon" />
										</span>
									</span>
								</label>
								<label className="form-check-label">
									{moment(value.timeSlot).format("LT")}
								</label>
							</div>
							<div className="float-right w-30 offer-bg" style={{display: value.promotion?"":"none"}}>
								{value.promotion !== null?value.promotion.offer:""}
							</div>
						</div>
					</div>
				);
			
		})
			return items;
		}
	}
	render(){
		return(
			<div className="wrapper has-footer main">
			<div className="main-header">
			  <h1 className="title text-center title-margin">Find Table</h1>
			</div>
			<div className="card-raised">
			<div className="row-no-gutters mt-page justify-content-center flex-container h-70vh">
				<div className="col name-page col-10 col-md-6 col-lg-4">
        
				<PageHeading
			  	heading={`Arrival Time for ${this.props.party}`}
			  	/>
            	<div className="row-no-gutters">
                	<div className="col-md-12 col-12 col-xs-12 col-lg-12 h-35">
						{this.renderTimeSlots()} 
					</div>
				</div>

				<div className="row-no-gutters" style={{display:this.props.loading?"none":""}}>
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
							inline />
					)
					}
					</div>
				</div>
            </div>
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
		loading: state.form.loading
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