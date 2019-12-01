import React from 'react';
import Globe from 'react-globe.gl';
import earthNight from '../imgs/earth-night.jpg';
import earthPlane from '../imgs/earth-plane.jpg';

export default ({ data, pointWeight, maxAltVal }) => (
	<Globe
		globeImageUrl={earthNight}
		// bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
		bumpImageUrl={earthNight}
		hexBinPointsData={data}
		hexBinPointLat={(d) => d.lat}
		hexBinPointLng={(d) => d.lng}
		hexBinResolution={4}
		hexBinPointWeight={pointWeight}
		hexAltitude={(d) => {
			const sum = Math.min(d.sumWeight, maxAltVal);
			return sum / maxAltVal;
		}}
		hexSideColor={() => '#0092FF'}
		hexTopColor={() => '#0092FF'}
		hexTransitionDuration={2000}
		hexLabel={(d) => {
			const k = d.points.reduce((acc, val) => acc + val.stakedvalue ,0)
			return `Staked Value: ${k} \n Points: ${d.sumWeight}`;
		}}
	/>
);
