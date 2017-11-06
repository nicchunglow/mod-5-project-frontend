import React, { Component } from 'react'
import Facilities from './Facilities'
import GoogleMapReact from 'google-map-react';

class SimpleMap extends React.Component {
  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
  };

  render() {
    return (
       <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        >
      </GoogleMapReact>
    );
  }
}
