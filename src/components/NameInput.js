import React from 'react';
import {connect} from 'react-redux';
import {onNameSelect} from '../actions';
import {Header,Footer, PageHeading} from './common';
import moment from 'moment';
var $ = require("jquery");
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
    
	render() {
        return (
          <div className="wrapper has-footer">
            <div className="main-header">
              <h1 className="title text-center title-margin">Find Table</h1>
            </div>
            <div className="card-raised">
              {/* <Header
              logo={this.props.logo}
              propertyName={this.props.propertyName}
              style={{ display: this.props.logo ? "" : "none" }}
            /> */}
              <div className="row-no-gutters mt-page justify-content-center flex-container">
                <div className="col name-page col-10 col-md-6 col-lg-4">
                  <div className="row-no-gutters">
                    <div className="col text-center">
                      <p className="page-heading">
                        <br />
                        <br />
                        {this.props.party} people @{" "}
                        {moment(this.props.time.timeSlot).format("LT")}
                      </p>
                      <p className="text-centet">
                        Enter name below and we'll have the table ready for you.
                      </p>
                    </div>
                  </div>
                  {/* <div className="row-no-gutters">
                    <div className="col text-center">
                      <p className="page-heading">
                        {this.props.party} people @{" "}
                        {moment(this.props.time.timeSlot).format("LT")}
                      </p>
                    </div>
                  </div> */}
                  <div className="row-no-gutters">
                    <div className="col">
                      <form>
                        <input
                          type="text"
                          className="input-field"
                          value={this.props.name}
                          onChange={this.nameInput.bind(this)}
                          placeholder="Name"
                          onFocusCapture={() => {
                            $("html,body").animate({ scrollTop: 300 }, 500);
                          }}
                        />
                        <button
                          className={
                            "button-brand btn-block " +
                            (this.props.name === "" ? "disabled" : "")
                          }
                          disabled={this.props.name === "" ? true : false}
                          onClick={() => {
                            this.props.history.push("/stepFour");
                          }}
                          style={{ margin: "auto" }}
                        >
                          Next
                        </button>
                      </form>
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
          </div>
        );
      }
    }
    const mapStateToProps = state => {
      return {
        name: state.form.name,
        logo: state.form.logo,
        propertyName: state.form.propertyName,
        party: state.form.party,
        time: state.form.time
      };
    };
    export default connect(
      mapStateToProps,
      { onNameSelect }
    )(NameInput);