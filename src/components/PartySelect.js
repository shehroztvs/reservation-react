import React from 'react';
import { connect } from 'react-redux';
import { onPartySelect,checkAuthorization,onCompletion } from '../actions';
import { Footer, PageHeading } from './common';
import queryString from 'query-string';
import loader from '../assets/loader.gif';
import forbidden from '../assets/forbidden.png';

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
			this.props.checkAuthorization(this.state.secret_key);
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
				<img src={loader} alt="Loading" style={{width:'65%',height:'auto',marginLeft: 'auto',marginRight: 'auto',display: 'block'}} />
			</div>);
		}
		else if(this.props.auth){
			return(
				
						<div className="col party-page col-10 col-md-6 col-lg-4">
							<PageHeading heading = "Table Size"/>
							<div className="row-no-gutters">
								<div className="col-md-3 col-3 col-xs-3 col-lg-3">
									<button
										className="button-brand btn-block"
										style={{backgroundColor: this.props.party === 1 ? "#676767" : ""}} 
										onClick={this.partySize.bind(this,1)}>
										1
									</button>
								</div>
								<div className="col-md-3 col-3 col-xs-3 col-lg-3">
									<button
										style={{backgroundColor: this.props.party === 2 ? "#676767" : ""}} className="button-brand btn-block"
										onClick={this.partySize.bind(this,2)}>
										2
									</button>
								</div>
								<div className="col-md-3 col-3 col-xs-3 col-lg-3">
									<button
										style={{backgroundColor: this.props.party === 3 ? "#676767" : ""}} className="button-brand btn-block"
										onClick={this.partySize.bind(this,3)}>
										3
									</button>
								</div>
								<div className="col-md-3 col-3 col-xs-3 col-lg-3">
									<button
										style={{backgroundColor: this.props.party === 4 ? "#676767" : ""}}className="button-brand btn-block"
										onClick={this.partySize.bind(this,4)}>
										4
									</button>
								</div>
							</div>
						</div>
					
			)
		}
		else{
			return(
				<div>
					<img src={forbidden} alt="Loading" style={{width:'65%',height:'auto',marginLeft: 'auto',marginRight: 'auto',display: 'block'}} />
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
    return{
		party : state.form.party,
		auth: state.form.auth,
		loading:state.form.loading
    }
}

export default connect(
	mapStateToProps,
	{
		onPartySelect,checkAuthorization,onCompletion
	}
)(PartySelect)