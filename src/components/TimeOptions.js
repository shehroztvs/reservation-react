import React from 'react';
import TimePicker from 'react-times';
import 'react-times/css/classic/default.css';
import moment from 'moment';
import {connect} from 'react-redux';
import {onTimeSelect} from '../actions';
import {Footer, Header} from './common';

class TimeOptions extends React.Component{
	
	constructor(props){
		super(props);
		this.state ={
			showTimeModal: false
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

	render(){
		return(
			<div className="wrapper has-footer">
				<Header/>
				<div className="row-no-gutters mt-page justify-content-center">
					<div className="col time-page col-10 col-md-6 col-lg-4">
						<div className="row-no-gutters">
							<div className="col text-center">
								<p className="page-heading">Timeslot for {this.props.party}: </p>
							</div>
						</div>
						<div className="row-no-gutters">
							<div className="col-md-6 col-6 col-xs-6 col-lg-6">
								<button className="button-brand btn-block" 
								style={{backgroundColor: this.props.selectedTime ===1? "#676767":""}}
								onClick={this.onTimeButtonClick.bind(this, 15,1)}>
									15 Mins
								</button>
							</div>
							<div className="col-md-6 col-6 col-xs-6 col-lg-6">
								<button
								style={{backgroundColor: this.props.selectedTime ===2? "#676767":""}} 
								className="button-brand btn-block" onClick={this.onTimeButtonClick.bind(this, 30,2)}>
									30 Mins
								</button>
							</div>
						</div>
						<div className="row-no-gutters" style={{marginTop:20}}>
							<div className="col-md-6 col-6 col-xs-6 col-lg-6">
								<button 
								style={{backgroundColor: this.props.selectedTime ===3? "#676767":""}}
								className="button-brand btn-block" onClick={this.onTimeButtonClick.bind(this, 45,3)}>
									45 Min
								</button>
							</div>
							<div className="col-md-6 col-6 col-xs-6 col-lg-6">
								{this.showTimeModal()}
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
		);
    }
}

const mapStateToProps = (state) => {
	return{
		selectedTime:state.form.selectedTime,
		time : state.form.time,
		party: state.form.party
    }
}

export default connect(mapStateToProps,{onTimeSelect})(TimeOptions)