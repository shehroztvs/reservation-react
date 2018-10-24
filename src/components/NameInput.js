import React from 'react';
import {connect} from 'react-redux';
import {onNameSelect} from '../actions';
import {Header,Footer} from './common';

class NameInput extends React.Component{

	checkDisable(){
		if(this.props.name===''){
            return true;
        }
        else{
            return false;
        }
	}

    onPrevious(){
        this.props.history.push('/stepTwo');
    }

    onNext(){
        console.log(this.props.time)
        this.props.history.push('/stepFour');
    }
	
    nameInput(event){
        this.props.onNameSelect(event.target.value);
    }
    
	render(){
        return(
			<div className="wrapper has-footer">
            	<Header/>
                    <div className="row-no-gutters mt-page justify-content-center">
            <div className="col name-page col-10 col-md-6 col-lg-4">
                <div className="row-no-gutters">
                    <div className="col text-center">
                        <p className="page-heading">Reservation for {this.props.party} at {this.props.time.hour}:{this.props.time.minute} {this.props.time.meridiem}</p>
                    </div>
                </div>
                <div className="row-no-gutters">
                    <div className="col">
                        <input 
                            type="text" 
                            className="input-field" 
                            value ={this.props.name} 
                            onChange={this.nameInput.bind(this)}
                            onClick={()=>{window.scrollTo(0, 200);}}
                            placeholder="Name"
                        />
                        
                        <button className={"button-brand btn-block "+(this.props.name===''?"disabled":"")} disabled={this.props.name===''?true:false} onClick={()=>{this.props.history.push('/stepFour');}}  style={{margin:"auto"}}>
                                Next
                        </button>
                    </div>
                </div>
            </div>
        </div>

					
					<Footer
						{...this.props}
						onPrevious={this.onPrevious.bind(this)}
						onNext={this.onNext.bind(this)}
						progressWidth="75%"
						step="3"
						disablePrevious={false}
						disableNext={this.checkDisable()}
					/>
				</div>

        );

    }
}

const mapStateToProps = (state) => {
    return{
        name : state.form.name,
        party: state.form.party,
        time: state.form.time
    }
}

export default connect(mapStateToProps,{onNameSelect})(NameInput)