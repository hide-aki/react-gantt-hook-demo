import { useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';

// useInterval Hook sets up an interval and clears it after unmounting. 
// It’s a combo of setInterval and clearInterval tied to the component lifecycle.
// See <a href="https://overreacted.io/making-setinterval-declarative-with-react-hooks/">useInterval Hook</a>
const useInterval = (callback, delay) => {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
};

const useZoomLevel = (zoom) => {
  switch (zoom) {
    case 'hour':
      gantt.config.scale_unit = 'day';
      gantt.config.date_scale = '%d %M';
      gantt.config.scale_height = 60;
      gantt.config.min_column_width = 30;
      gantt.config.subscales = [
        {
          unit: 'hour',
          step: 1,
          date: '%H',
        },
      ];
      break;
    case 'day':
      gantt.config.scale_unit = 'day';
      gantt.config.step = 1;
      gantt.config.date_scale = '%d %M';
      gantt.config.subscales = [];
      gantt.config.scale_height = 60;
      gantt.templates.date_scale = null;
      gantt.config.min_column_width = 100;
      break;
    default: break;
  }
};

export { useInterval, useZoomLevel };