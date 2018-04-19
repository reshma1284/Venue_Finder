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
        venues : "loading",
        locationValidationMsg: null,
        categoryValidationMsg: null
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
// Validating the form fields
    let locationValidationMsg , categoryValidationMsg = null;
    if (!this.state.data.location){
      locationValidationMsg =  'Location should not be empty';
    }
    if(!this.state.data.category){
      categoryValidationMsg =  'Category should not be empty';
    }
    this.setState({
        locationValidationMsg: locationValidationMsg,
        categoryValidationMsg: categoryValidationMsg
        })

    if(!locationValidationMsg && !categoryValidationMsg){

          let _this = this;
          const CLIENT_ID = '5FYV05ZWNRTAGO3DTM4VDUXUVFMWIKBXQP0YPP04HZZY0OT1';
          const CLIENT_SECRET = 'PROAAXR0P4IKVRV1HZNJPJQTU4MIV0V4WFW5YR2SD0ITLZ0K';
          const vdate = '20180425';
          let location = _this.state.data.location;
          let QUERY = _this.state.data.category;
          const LIMIT = 5;
          let RADIUS = _this.state.data.distance || 1000;

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
  }


  render(){
    return(
      <div className="container page-content">
        <h1> Venue Finder App </h1>

//form fields to accept user input (Location, Category, Distance)

        <form onSubmit={this.handleSubmit} id="getUserInput">
              <div className="form-group">
                  <label htmlFor="inputLocation">Location</label>
                  <input type="text" name="location" value={this.state.data.location} onChange={this.handleChange} className="form-control" id="inputLocation" aria-describedby="emailHelp" placeholder="Enter the Location" />
                  <span className="text-danger"> {this.state.locationValidationMsg}</span>

              </div>

              <div className="form-group">
                  <label htmlFor="inputCategory">Category</label>
                  <input type="text" name="category" value={this.state.data.category} onChange={this.handleChange} className="form-control" id="inputCategory" placeholder="Enter the Category" />
                  <span className="text-danger"> {this.state.categoryValidationMsg}</span>
              </div>

              <div className="form-group">
                  <label htmlFor="inputDistance">Distance Limit</label>
                  <input type="number" name="distance" value={this.state.data.distance} onChange={this.handleChange} className="form-control" id="inputDistance" placeholder="Enter the distance limit in meter" />
              </div>
              <button type="submit" className="btn btn-primary">Search!</button>
              <p className="text-danger">{}</p>
          </form>

//displaying the venue list using the map function

          { this.state.venues &&
            this.state.venues !== "loading" &&
          this.state.venues.map(function(item,index){

            return(
                    <div  key={index} id="listArea">
                    <div className="venueInfo">

                      <ul className="VenueList-leftList">
                          <table>
                          <thead></thead>
                          <tbody>
                            <tr>
                              <td className="VenueList-firstCol">  <li> Name: </li></td>
                              <td className="VenueList-secCol"> <li> <h3> {item.name} </h3></li> </td>
                             </tr>


                                 {item.location.address !== undefined ?
                                   <tr>
                                      <td className="VenueList-firstCol"><li> Address: </li> </td>
                                      <td className="VenueList-secCol"> <li> {item.location.address} </li></td>
                                   </tr>
                                  :
                                   <tr>
                                       <td className="VenueList-firstCol"><li> Address: </li> </td>
                                       <td className="VenueList-secCol"> <li> Not Available </li></td>
                                   </tr>
                                 }

                                 {item.location.crossStreet !== undefined ?
                                   <tr>
                                     <td className="VenueList-firstCol"><li> Cross Street: </li> </td>
                                     <td className="VenueList-secCol"> <li> {item.location.crossStreet} </li></td>
                                   </tr>
                                  :
                                   <tr>
                                     <td className="VenueList-firstCol"><li> Cross Street: </li> </td>
                                     <td className="VenueList-secCol"> <li> Not Available </li></td>
                                   </tr>
                                 }

                                 {item.location.distance !== undefined ?
                                   <tr>
                                     <td className="VenueList-firstCol"><li> Distance: </li> </td>
                                     <td className="VenueList-secCol">  <li> {item.location.distance} </li> </td>
                                   </tr>
                                  :
                                   <tr>
                                      <td className="VenueList-firstCol"><li> Distance: </li> </td>
                                      <td className="VenueList-secCol">  <li> Not Available </li> </td>
                                   </tr>
                                 }

                                 {item.categories[0].name !== undefined ?
                                   <tr>
                                     <td className="VenueList-firstCol"><li> Category Name: </li> </td>
                                     <td className="VenueList-secCol">  <li> {item.categories[0].name} </li> </td>
                                   </tr>
                                  :
                                   <tr>
                                      <td className="VenueList-firstCol"><li> Category Name: </li> </td>
                                      <td className="VenueList-secCol">  <li> Not Available </li> </td>
                                   </tr>
                                 }
                             </tbody>
                          </table>
                          </ul>
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
