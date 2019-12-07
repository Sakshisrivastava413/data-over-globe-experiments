import React from 'react';
import Globe from 'react-globe.gl';
import earthNight from '../imgs/earth-night.jpg';

export default ({ data, pointWeight, maxAltVal, rotationStatus }) => {

  const globeEl = React.useRef();

  React.useEffect(() => {
    globeEl.current.controls().autoRotate = rotationStatus ? true : false;
    globeEl.current.controls().autoRotateSpeed = 0.1;
  }, [rotationStatus]);

  return (
    <Globe
      ref={globeEl}
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
        return sum / (maxAltVal + 100);
      }}
      hexSideColor={() => '#0092FF'}
      hexTopColor={() => '#0092FF'}
      hexTransitionDuration={1000}
      hexLabel={(d) => {
        const k = d.points.reduce((acc, val) => acc + val.stakedvalue ,0)
        return `Staked Value: ${k} \n Points: ${d.sumWeight}`;
      }}
    />
  )
};
