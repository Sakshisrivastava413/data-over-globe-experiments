import React from 'react';
import Geohash from 'latlon-geohash';
import Globe from './components/globe';
import TimeSeries from './components/timeseries';
import AnalyticsPanel from './components/AnalyticsPanel';

const transformData = data => data
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .map((item) => ({
    ...item,
    lat: Geohash.decode(item.geohash).lat,
    lng: Geohash.decode(item.geohash).lon,
    stakedvalue: parseFloat((parseInt(item.deposit, 16) * 10 ** -18).toFixed(2)),
  }));

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filteredData: [],
    };

    this.reset = this.reset.bind(this);
    this.toggle = this.toggle.bind(this);
    this.filterData = this.filterData.bind(this);
  }

  async componentDidMount() {
    const response = await fetch('/data1000.json').then(res => res.json());
    const data = transformData(response);
    this.setState({
      data,
      filteredData: data,
      timelineMin: 0,
      timelineMax: data.length - 1
    });
  }

  filterData(newMinVal, newMaxVal) {
    const { timelineMin, timelineMax, data } = this.state;

    console.log(newMinVal, newMaxVal);
    
    if (newMinVal !== timelineMin || newMaxVal !== timelineMax) {
      this.setState({
        timelineMin: newMinVal,
        timelineMax: newMaxVal,
        filteredData: data.slice(newMinVal, newMaxVal),
      });
    }
  }

  toggle() {

  }

  reset() {

  }

  render() {
    const { data, filteredData, timelineMin, timelineMax } = this.state;

    const [min, max] = [0, data.length - 1];

    return (
      <div>
        <AnalyticsPanel />
        <Globe
          data={filteredData}
          pointWeight="stakedvalue"
          maxAltVal={10e2}
        />
        <TimeSeries
          display={true}
          count={2}
          length={data.length || 0}
          minRange={min}
          maxRange={max}
          curMinVal={timelineMin}
          curMaxVal={timelineMax}
          curMinDate={filteredData[timelineMin] && filteredData[timelineMin].createdAt}
          curMaxDate={filteredData[timelineMax] && filteredData[timelineMax].createdAt}
          initialMinValue={min}
          initialMaxValue={max}
          filterData={this.filterData}
          play={this.toggle}
          reset={this.reset}
          isPlayButton={true}
        />
      </div>
    );
  }
}

export default App;
