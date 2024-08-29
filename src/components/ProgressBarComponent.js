import React, {useEffect, useState} from 'react';
import {useAppContext} from "@/contexts/AppContext";

const ProgressBar = (props) => {
  let {
    size = 150,
    progress = 0,
    trackWidth = 10,
    trackColor = `transparent`,
    indicatorWidth = 10,
    indicatorColor = `red`,
    indicatorCap = `round`,
    label = `Loading...`,
    labelColor = `#fff`,
    spinnerMode = false,
    spinnerSpeed = 1
  } = props

  const center = size / 2,
    radius = center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
    dashArray = 2 * Math.PI * radius,
    dashOffset = dashArray * ((100 - progress) / 100);
  //console.log(dashOffset);

  let hideLabel = (size < 100 || !label.length || spinnerMode) ? true : false

  return (
    <>
      <div
        className="svg-pi-wrapper"
        style={{ width: size, height: size }}
      >
        <svg
          className="svg-pi"
          style={{ width: size, height: size }}
        >
          <circle
            className="svg-pi-track"
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={trackColor}
            strokeWidth={trackWidth}
          />
          <circle
            className={`svg-pi-indicator ${
              spinnerMode ? "svg-pi-indicator--spinner" : ""
            }`}
            style={{ animationDuration: spinnerSpeed * 1000 }}
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={indicatorColor}
            strokeWidth={indicatorWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap={indicatorCap}
          />
        </svg>

        {!hideLabel && (
          <div
            className="svg-pi-label"
            style={{ color: labelColor }}
          >
            {/*<span className="svg-pi-label__loading">*/}
            {/*  {label}*/}
            {/*</span>*/}

            {!spinnerMode && (
              <span className="svg-pi-label__progress">
                {`${
                  progress > 100 ? 100 : progress
                }%`}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  )
}


const EmbossedCircle = (props) => {
  const circleStyle = {
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    margin:'3rem auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#f9f9f9', // Light grey background for better contrast
    boxShadow: `
      -20px -20px 40px rgba(255, 255, 255, 0.48), /* Top-left highlight */
      20px 20px 40px rgba(0, 0, 0, 0.3), /* Bottom-right shadow */
    
      inset 3px 3px 5px rgba(255, 255, 255, 0.05) /* Inner highlight */
    `,
  };

  return <div style={circleStyle}>{props.children}</div>;
};

const ProgressBarComponent = (props) => {
  const { globalState, setGlobalState } = useAppContext();
  //console.log('globalState: ', globalState);
  const [progress, setProgress] = useState(0);
  const targetProgress = globalState?.balance ? globalState.balance * 10 : 0;
  //console.log('Initial Progress:', progress);

  // Smooth animation effect
  useEffect(() => {
    let start = null;
    const duration = 1000; // duration of the animation in milliseconds

    const animateProgress = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const newProgress = Math.min(elapsed / duration * targetProgress, targetProgress);

      setProgress(newProgress);

      if (elapsed < duration) {
        requestAnimationFrame(animateProgress);
      }
    };

    if (targetProgress > 0) {
      requestAnimationFrame(animateProgress);
    }
  }, [targetProgress]);

  // Ensure the progress is a valid number before rounding
  let roundedNum = Math.round((progress + Number.EPSILON) * 100) / 100;

  return (
    <div style={{ textAlign: 'center' }}>
      <EmbossedCircle>
        <ProgressBar progress={roundedNum} trackWidth={15} indicatorWidth={10} />
      </EmbossedCircle>
    </div>
  );
};


export default ProgressBarComponent;