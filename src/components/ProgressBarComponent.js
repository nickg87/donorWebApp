import React, { useEffect, useState } from 'react';
import { useAppContext } from "@/contexts/AppContext";
import classes from "./ProgressBarComponent.module.scss";


//https://codepen.io/alemarzano/pen/bGxPKxe
const ProgressCircle = ({ progress }) => {
  const { globalState } = useAppContext();
  const progressRef = React.useRef(null);

  useEffect(() => {
    if (progressRef.current) {
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
      className={[classes.progressbar, classes[globalState.theme]].join(' ')}
      style={{ '--value': progress }} // Make sure this is a valid CSS value
    >
      <span className={`${classes.progressText} ${classes[globalState.theme]}`}>
        {progress}%
      </span>
    </div>
  );
};

const ProgressBarComponent = () => {
  const { globalState } = useAppContext();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prizeAmount = parseFloat(globalState?.currentPool?.prize_amount || 0);
    const currentBalance = parseFloat(globalState?.currentPoolBalance || 0);
    const percentage = prizeAmount > 0 ? (currentBalance / prizeAmount) * 100 : 0;

    let animationFrameId;
    const duration = 1000;
    let start = null;

    const animateProgress = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const newProgress = Math.min((elapsed / duration) * percentage, percentage);

      setProgress(newProgress);

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(animateProgress);
      }
    };

    if (percentage > 0) {
      animationFrameId = requestAnimationFrame(animateProgress);
    } else {
      setProgress(0);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [globalState.currentPoolBalance, globalState.currentPool?.prize_amount]);

  return (
    <div style={{ textAlign: 'center' }}>
      <div className={[classes.embossedCircle, classes[globalState.theme]].join(' ')}>
        <ProgressCircle progress={Math.round(progress)} />
      </div>
    </div>
  );
};

export default ProgressBarComponent;
