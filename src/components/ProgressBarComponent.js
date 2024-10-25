import React, { useEffect, useState } from 'react';
import { useAppContext } from "@/contexts/AppContext";

const ProgressCircle = ({ progress }) => {
  const { globalState } = useAppContext();
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
      style={{ '--value': progress }} // Ensure progress is a valid CSS value
    >
      <span className={`progress-text ${globalState.theme === 'dark' ? 'darkTheme' : 'lightTheme'}`}>{progress}%</span>
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
      <div className="embossed-circle">
        <ProgressCircle progress={Math.round(progress)} />
      </div>
    </div>
  );
};

export default ProgressBarComponent;
