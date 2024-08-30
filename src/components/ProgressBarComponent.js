import React, {useEffect, useState} from 'react';
import {useAppContext} from "@/contexts/AppContext";


const ProgressCircle = ({ progress }) => {
  //console.log(progress);
  const progressRef = React.useRef(null);

  useEffect(() => {
    if (progressRef.current) {
      // Using setProperty to handle --value correctly even with decimals
      progressRef.current.style.setProperty('--value', progress.toString());
    }
  }, [progress]);

  return (
    <div
      ref={progressRef}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
      style={{'--value': progress}} // Ensure progress is a valid CSS value
    ><span className="progress-text">{progress}%</span></div>
  );
};


const ProgressBarComponent = (props) => {
  const { globalState, setGlobalState } = useAppContext();
  const [progress, setProgress] = useState(0);
  const targetProgress = globalState?.balance ? globalState.balance * 10 : 0;

  // Smooth animation effect
  useEffect(() => {
    console.log('enters here')
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
  }, [targetProgress, globalState?.balance]);

  // Ensure the progress is a valid number before rounding
  let roundedNum = Math.round((progress + Number.EPSILON) * 100) / 100;

  // fix progress not showing
  useEffect(() => {
    roundedNum = Math.round((progress + Number.EPSILON) * 100) / 100;
  }, [progress]);

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="embossed-circle">
        <ProgressCircle progress={roundedNum}/>
      </div>
    </div>
  );
};


export default ProgressBarComponent;