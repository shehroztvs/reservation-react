import React from 'react';
import { connect } from 'react-redux';
import { onPartySelect, checkAuthorization, onCompletion } from '../actions';
import { Footer } from './common';
import queryString from 'query-string';
import loader from '../assets/loader.gif';
import forbidden from '../assets/forbidden.png';
import Select from "react-select";

class PartySelect extends React.Component{
	constructor(props){
		super(props);

		const values = queryString.parse(this.props.location.search);

		this.state = {
			secret_key: values.id
		};
	}

	componentDidMount() {
		if (this.props.auth === false) {
			this.props.checkAuthorization('kolachi123', this.props.date);
		}
	}

	checkDisable(){
        if(this.props.party === ''){
            return true;
        }
        else{
            return false;
        }
    }

    onPrevious(){
        return;
	}
	
	renderMore(){
		let items = []; 

		if(this.props.minPartySize + 3 <= this.props.maxPartySize){
			for (var i = this.props.minPartySize + 3 ; i <= this.props.maxPartySize; i++) {             
				items.push({
					i,
					label:i
				});   
			}
		}

		return items;
	}

    onNext(){
        this.props.history.push('/stepTwo');
    }
	
	partySize(value){
		this.props.onPartySelect(value);

		setTimeout(() => {
			this.props.history.push('/stepTwo');
		}, 200)
	}

	renderBody(){
		if(this.props.loading){
			return(
				<div>
					<img
						src={loader}
						alt="Loading"
						style={{
							width: '65%',
							height: 'auto',
							marginLeft: 'auto',
							marginRight: 'auto',
							display: 'block'
						}}
					/>
				</div>
			);
		}
		else if(this.props.auth) {
			return (
				<div className="col party-page col-10 col-md-6 col-lg-4">
					<div className="row-no-gutters">
						<div className="col text-center">
							<p className="page-heading">Table Size</p>
						</div>
					</div>
					<div className="row-no-gutters">
						<div
							className="col-md-3 col-3 col-xs-3 col-lg-3"
							style={{
								paddingLeft:10,
								paddingRight:10,
								margin: 'auto'
							}}
						>
							<button
								style={{
									backgroundColor: this.props.party === this.props.minPartySize ? "#676767" : ""
								}}
								className="select-brand button-brand btn-block"
								onClick={this.partySize.bind(this, this.props.minPartySize)}
							>
								{this.props.minPartySize}
							</button>
						</div>
						<div
							className="col-md-3 col-3 col-xs-3 col-lg-3"
							style={{
								paddingLeft:10,
								paddingRight:10,
								margin: 'auto'
							}}
						>
							<button
								style={{
								backgroundColor:
									this.props.party === this.props.minPartySize + 1 ? "#676767" : ""
								}}
								className="select-brand button-brand btn-block"
								onClick={this.partySize.bind(this, this.props.minPartySize + 1)}
							>
								{this.props.minPartySize + 1}
							</button>
						</div>
						<div
							className="col-md-3 col-3 col-xs-3 col-lg-3"
							style={{
								paddingLeft:10,
								paddingRight:10,
								margin: 'auto'
							}}
						>
							<button
								style={{
								backgroundColor:
									this.props.party === this.props.minPartySize + 2 ? "#676767" : ""
								}}
								className="select-brand button-brand btn-block"
								onClick={this.partySize.bind(this, this.props.minPartySize + 2)}
							>
								{this.props.minPartySize + 2}
							</button>
						</div>
						{!(this.props.minPartySize + 3 > this.props.maxPartySize) && 
							<div
								className="col-md-3 col-3 col-xs-3 col-lg-3"
								style={{
									paddingLeft:10,
									paddingRight:10,
									margin: 'auto'
								}}
							>
								<Select
									className="select-brand"
									options={this.renderMore()}
									isSearchable={false}
									onChange={selectedOption => {
										this.partySize(selectedOption.label);
									}}
									placeholder={
										this.props.party >= this.props.minPartySize + 3 ? this.props.party : "+"
									}
								/>
							</div>
						}
					</div>
            	</div>	
			);
		}
		else {
			return (
				<div>
					<img
						src={forbidden}
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
			);
		}
	}

	render(){
        return(
			<div className="wrapper has-footer">
				<div className="main-header">
					<h1 className="title text-center title-margin">Find Table</h1>
				</div>
				<div className="card-raised">
					<div className="row-no-gutters mt-page justify-content-center flex-container">
						{this.renderBody()}
					</div>
					<Footer
						{...this.props}
						onPrevious={this.onPrevious.bind(this)}
						onNext={this.onNext.bind(this)}
						progressWidth="25%"
						step="1"
						disablePrevious={false}
						disableNext={this.checkDisable()}
					/>
				</div>
			</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
		party : state.form.party,
		auth: state.form.auth,
		loading:state.form.loading,
		minPartySize: state.form.minPartySize,
		maxPartySize: state.form.maxPartySize,
		date: state.form.date
    }
}

export default connect(
	mapStateToProps,
	{
		onPartySelect,
		checkAuthorization,
		onCompletion
	}
)(PartySelect);
