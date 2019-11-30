import React, { useState, useEffect } from 'react';
import Geohash from 'latlon-geohash';
import Globe from 'react-globe.gl';

import earth from './imgs/earth-night.jpg';
import './App.css';

let data = require('./data1000.json');

function App() {

  const [finalData, updateData] = useState([]);

  const db = data.map((item) => ({
        lat: Geohash.decode(item.geohash).lat,
        lng: Geohash.decode(item.geohash).lon,
        stakedvalue: parseFloat((parseInt(item.deposit, 16) * 10 ** -18).toFixed(2))
      }));

  console.log(db.slice(0,5))

  useEffect(() => {
      // load data
      updateData(db)

    }, []);

  return (
    <div className="App">
    <Globe
      globeImageUrl={earth}
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

      hexBinPointsData={finalData}
      hexBinPointLat={(d) => d.lat}
      hexBinPointLng={(d) => d.lng}

      hexBinResolution={4}
      hexAltitude={(d) => d.points.reduce((acc, val) => acc + val.stakedvalue, 0) * 0.0001}
      hexSideColor={() => '#0092FF'}
      hexTopColor={() => '#0092FF'}
      hexTransitionDuration={5000}
      hexLabel={(d) => {
        const k = d.points.reduce((acc, val) => acc + val.stakedvalue ,0)
        return `Staked Value: ${k} \n Points: ${d.sumWeight}`;
      }}
    />
    </div>
  );
}

export default App;
