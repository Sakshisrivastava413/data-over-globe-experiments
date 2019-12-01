import React from 'react';
import Geohash from 'latlon-geohash';
import Globe from './components/globe';
import TimeSeries from './components/timeseries';

const transformData = data => data
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .map((item) => ({
    createdAt: item.state.createdAt,
    lat: Geohash.decode(item.geohash).lat,
    lng: Geohash.decode(item.geohash).lon,
    stakedvalue: parseFloat((parseInt(item.state.deposit, 16) * 10 ** -18).toFixed(2)),
  }));

const getDataDateChunks = data => {
  const chunks = {};
  data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  data.forEach(p => {
    const date = new Date(p.createdAt);
    const id = `${date.getFullYear()}-${date.getMonth()}`;
    if (!chunks[id]) chunks[id] = [];
    chunks[id].push(p);
  });
  return chunks;
};

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filteredData: [],
      loading: true,
    };

    this.reset = this.reset.bind(this);
    this.toggle = this.toggle.bind(this);
    this.filterData = this.filterData.bind(this);
  }

  async componentDidMount() {
    const response = await fetch('/data.json').then(res => res.json());
    const data = transformData(response);
    const dataDateChunks = Object.values(getDataDateChunks(data));
    this.setState({
      loading: false,
      data,
      filteredData: data,
      dataDateChunks,
      timelineMin: 0,
      timelineMax: Object.keys(dataDateChunks).length - 1
    });
  }

  filterData(newMinVal, newMaxVal) {
    const { timelineMin, timelineMax, dataDateChunks } = this.state;

    if (newMinVal !== timelineMin || newMaxVal !== timelineMax) {
      this.setState({
        timelineMin: newMinVal,
        timelineMax: newMaxVal,
        filteredData: dataDateChunks
          .slice(newMinVal, newMaxVal)
          .reduce((a, b) => a.concat(b), []),
      });
    }
  }

  toggle() {

  }

  reset() {

  }

  render() {
    const { loading, data, filteredData, dataDateChunks, timelineMin, timelineMax } = this.state;

    if (loading) return <p>loading...</p>;

    const [min, max] = [0, Object.keys(dataDateChunks).length - 1];

    return (
      <div>
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
