import React, { Component } from 'react';
import '../styles/VenueList.css';

class VenueList extends Component{
  constructor(props){
    super(props);
    this.state = {
      data : {
        location : "",
        category : "",
        distance : ""
      },
        venues : "loading"
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

//handleChange function to update the state according to the form input
  handleChange(element){
  var formData = this.state.data;
      formData[element.target.name] = element.target.value;
      this.setState({
        data : formData
      });
}

/*
  @ desc handleSubmit function fetch the Venue details from FourSquare API based
    on the input values
  @ param event
*/
  handleSubmit(event){
    event.preventDefault();
  }


  render(){
    return(
      <div className="container page-content">
        <h1> Venue Finder App </h1>
        <form onSubmit={this.handleSubmit} id="getUserInput">
              <div className="form-group">
                  <label htmlFor="inputLocation">Location</label>
                  <input type="text" name="location" value={this.state.data.location} onChange={this.handleChange} className="form-control" id="inputLocation" aria-describedby="emailHelp" placeholder="Enter the Location" />
                  <span className="text-danger"> {}</span>
              </div>

              <div className="form-group">
                  <label htmlFor="inputCategory">Category</label>
                  <input type="text" name="category" value={this.state.data.category} onChange={this.handleChange} className="form-control" id="inputCategory" placeholder="Enter the Category" />
                  <span className="text-danger"> {}</span>
              </div>

              <div className="form-group">
                  <label htmlFor="inputDistance">Distance Limit</label>
                  <input type="number" name="distance" value={this.state.data.distance} onChange={this.handleChange} className="form-control" id="inputDistance" placeholder="Enter the distance limit in meter" />
                  <span className="text-danger"> {}</span>
              </div>
              <button type="submit" className="btn btn-primary">Search!</button>
              <p className="text-danger">{}</p>
          </form>
        </div>
    )
  }
}

export default VenueList;
