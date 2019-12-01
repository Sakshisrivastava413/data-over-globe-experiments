import React from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import playButton from '../imgs/play.svg';
import pauseButton from '../imgs/pause.svg';
import resetButton from '../imgs/undo.svg';

const TimeSeriesSlider = (props) => {
  const {
    display,
    minRange,
    maxRange,
    initialMinValue,
    initialMaxValue,
    curMinVal,
    curMaxVal,
    curMinDate,
    curMaxDate,
    count,
    filterData,
    length,
    play,
    isPlayButton,
    reset,
  } = props;

  if (display === false) return null;

  const filterDate = (event) => {
    filterData(event[0], event[1]);
  };

  return (
    <div className="abs-container-bottom main-container-bottom">
      <div className="date-row">
        <div>
          <div className="play">
            <button type="button" className="button-img-container">
              <img onClick={play} className="play-pause-btn" alt="PlayPauseButton" src={isPlayButton ? playButton : pauseButton} />
            </button>
            <button type="button" className="button-img-container">
              <img onClick={reset} className="play-pause-btn" alt="PlayPauseButton" src={resetButton} />
            </button>
            <div>{length > 0 ? (new Date(curMinDate).toLocaleDateString().split(',')[0]) : ''}</div>
          </div>
        </div>
        <div>{length > 0 ? (new Date(curMaxDate).toLocaleDateString().split(',')[0]) : ''}</div>
      </div>
      <Range
        onChange={filterDate}
        min={minRange}
        max={maxRange}
        value={[curMinVal, curMaxVal]}
        count={count}
        defaultValue={[initialMinValue, initialMaxValue]}
        allowCross={false}
        pushable={false}
        trackStyle={[{ backgroundColor: '#363636' }]}
        handleStyle={[
          {
            backgroundColor: 'white',
            borderRadius: '0',
            border: '0',
            width: '8px',
            padding: '0',
          },
          {
            backgroundColor: 'white',
            borderRadius: '0',
            border: '0',
            width: '8px',
            padding: '0',
          }]}
        activeHandleStyle={[{
          background: 'green',
        },

        ]}
        railStyle={{ backgroundColor: '#D6D6D6' }}
      />
    </div>
  );
};

export default TimeSeriesSlider;