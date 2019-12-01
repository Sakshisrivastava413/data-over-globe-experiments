import React, { useState, useEffect } from 'react';
import Geohash from 'latlon-geohash';
import Globe from './components/globe.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    const response = await fetch('/data1000.json').then(res => res.json())
    this.setState({
      data: response.map((item) => ({
        lat: Geohash.decode(item.geohash).lat,
        lng: Geohash.decode(item.geohash).lon,
        stakedvalue: parseFloat((parseInt(item.deposit, 16) * 10 ** -18).toFixed(2))
      })),
    });
    setTimeout(() => {
      this.setState({
        data: response.slice(0, 100).map((item) => ({
          lat: Geohash.decode(item.geohash).lat,
          lng: Geohash.decode(item.geohash).lon,
          stakedvalue: parseFloat((parseInt(item.deposit, 16) * 10 ** -18).toFixed(2))
        }))
      })
    }, 4000);
  }

  render() {
    return (
      <div className="App">
        <Globe
          data={this.state.data}
          pointWeight="stakedvalue"
          maxAltVal={10e2}
        />
      </div>
    );
  }
}

export default App;
