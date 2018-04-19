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
    let _this = this;
    const CLIENT_ID = '5FYV05ZWNRTAGO3DTM4VDUXUVFMWIKBXQP0YPP04HZZY0OT1';
    const CLIENT_SECRET = 'PROAAXR0P4IKVRV1HZNJPJQTU4MIV0V4WFW5YR2SD0ITLZ0K';
    const vdate = '20180425';
    var location = _this.state.data.location;
    var QUERY = _this.state.data.category;
    const LIMIT = 5;
    var RADIUS = _this.state.data.distance;

    fetch(`https://api.foursquare.com/v2/venues/search?near=${location}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&query=${QUERY}&v=${vdate}&limit=${LIMIT}&radius=${RADIUS}`)
    .then(function(response){
      return response.json();
    })
    .then(function(json_response){
      _this.setState({venues : json_response.response.venues})
    })
    .catch(function(error){
      console.log(error);
    });
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

          { this.state.venues !== "loading" &&
          this.state.venues.map(function(item,index){

            return(
                    <div  key={index} id="listArea">
                    <img src="/linkedin-logo.png" alt="Venue_logo" className="venueLogo" />
                    <div className="venueInfo">
                        <h3> Name:  {item.name} </h3>

                        {item.location.address !== undefined ?
                              <p> Address:  {item.location.address}</p>
                            :
                              <p> Address:  Not Available </p>
                        }

                        {item.location.crossStreet !== undefined ?
                              <p> CrossStreet:  {item.location.crossStreet}</p>
                            :
                              <p> CrossStreet:  Not Available </p>
                        }

                        {item.location.distance !== undefined ?
                              <p> Distance:  {item.location.distance}</p>
                            :
                              <p> Distance:  Not Available </p>
                        }

                        {item.categories[0].name !== undefined ?
                              <p> Category name:  {item.categories[0].name}</p>
                            :
                              <p> Category name:  Not Available </p>
                        }
                    </div>
                  </div>
                )
          })

        }

        </div>
    )
  }
}

export default VenueList;
