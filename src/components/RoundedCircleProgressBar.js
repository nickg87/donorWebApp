import React, { useEffect, useRef } from 'react';
import classes from './RoundedCircleProgressBar.module.scss';
import { useAppContext } from "@/contexts/AppContext";

const RoundedCircleProgressBar = () => {
  const { globalState } = useAppContext();
  const progressCircleRef = useRef(null);
  const progressBarInstance = useRef(null);

  // Calculate progress based on prize_amount and currentPoolBalance
  const prizeAmount = parseFloat(globalState?.currentPool?.prize_amount || 0);
  const currentBalance = parseFloat(globalState?.currentPoolBalance || 0);
  const progress = prizeAmount > 0 ? (currentBalance / prizeAmount) * 100 : 0;
  // Determine trailColor based on theme
  const trailColor = globalState.theme === 'dark' ? '#10173F' : '#FFF7E8FF'; // Change '#E0E0E0' to your desired light theme color


  useEffect(() => {
    if (typeof window !== 'undefined' && !progressBarInstance.current) {
      import('progressbar.js').then(({ default: ProgressBar }) => {
        // Initialize the progress bar with calculated progress
        progressBarInstance.current = new ProgressBar.Circle(progressCircleRef.current, {
          strokeWidth: 25,
          color: 'url(#gradient)',
          trailColor: trailColor,
          trailWidth: 25,
          svgStyle: null,
          text: {
            className: classes['progressCircle__label'],
          },
          step: (state, circle) => {
            const value = `${Math.round(circle.value() * 100)}%`;
            circle.setText(value);
          },
        });

        // Add gradient definition
        const gradient = `
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#FDE957"/>
              <stop offset="55%" stop-color="#F78501"/>
              <stop offset="100%" stop-color="#FDE957"/>
            </linearGradient>
          </defs>
        `;
        progressBarInstance.current.svg.insertAdjacentHTML('afterbegin', gradient);

        // Set initial progress
        progressBarInstance.current.animate(progress / 100, {
          duration: 0, // No animation, set directly
          easing: 'linear',
        });
      });
    } else if (progressBarInstance.current) {
      // Update progress directly without animation
      progressBarInstance.current.set(progress / 100);
    }

    // Cleanup on unmount
    return () => {
      if (progressBarInstance.current) {
        progressBarInstance.current.destroy();
        progressBarInstance.current = null;
      }
    };
  }, [progress, trailColor]);

  return (
    <div style={{ textAlign: 'center' }}>
      <div className={[classes.embossedCircle, classes[globalState.theme]].join(' ')}>
        <div ref={progressCircleRef} id="progressCircle"
             className={[classes.progressCircle, classes[globalState.theme]].join(' ')}></div>
        <div className={[classes.innerCircle, classes[globalState.theme]].join(' ')}></div>
      </div>
    </div>
  );
};

export default RoundedCircleProgressBar;
