import React from 'react';
import {connect} from 'react-redux';
import {onPartySelect} from '../actions';
import {Header,Footer, PageHeading} from './common';

class PartySelect extends React.Component{

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

	render(){
        return(
			<div className="wrapper has-footer main">
				<div className="main-header">
				<h1 className="title text-center title-margin">Find Table</h1>
				</div>
				<div className="card-raised">
			
				<div className="row-no-gutters mt-page justify-content-center flex-container">
					<div className="col party-page col-10 col-md-6 col-lg-4">
						<PageHeading
						heading= "Table Size"
						/>
						<div className="row-no-gutters">
							<div className="col-md-3 col-3 col-xs-3 col-lg-3">
								<button style={{backgroundColor: this.props.party === 1 ? "#676767" : ""}} className="button-brand btn-block" onClick={this.partySize.bind(this,1)}>
									1
								</button>
							</div>
							<div className="col-md-3 col-3 col-xs-3 col-lg-3">
								<button style={{backgroundColor: this.props.party ===2? "#676767":""}} className="button-brand btn-block" onClick={this.partySize.bind(this,2)}>
									2
								</button>
							</div>
							<div className="col-md-3 col-3 col-xs-3 col-lg-3">
								<button style={{backgroundColor: this.props.party === 3 ? "#676767" : ""}} className="button-brand btn-block" onClick={this.partySize.bind(this,3)}>
									3
								</button>
							</div>
							<div className="col-md-3 col-3 col-xs-3 col-lg-3">
								<button style={{backgroundColor: this.props.party ===4 ? "#676767" : ""}} className="button-brand btn-block" onClick={this.partySize.bind(this,4)}>
									4
								</button>
							</div>
						</div>
					</div>
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
    	party : state.form.party
    }
}

export default connect(mapStateToProps,{onPartySelect})(PartySelect)