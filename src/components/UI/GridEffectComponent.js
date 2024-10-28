import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import MobileDetect from 'mobile-detect';
import classes from './GridEffectComponent.module.scss';

const GridEffectComponent = () => {
  const { globalState } = useAppContext();
  const md = new MobileDetect(window.navigator.userAgent);
  const isMobile = !!md.mobile(); // Detect if the device is mobile

  // Get item width based on device type (mobile or desktop)
  const getItemWidth = () => {
    return isMobile ? 100 : window.innerWidth > 560 ? 130 : 100;
  };

  // Get number of rows based on device type
  const getNumberRows = () => {
    return isMobile ? 11 : window.innerWidth > 560 ? 7 : 11;
  };

  const [itemWidth, setItemWidth] = useState(getItemWidth());
  const [numberRows, setNumberRows] = useState(getNumberRows());
  const [columns, setColumns] = useState(Math.floor(window.innerWidth / itemWidth));

  const updateGrid = () => {
    const currentWidth = window.innerWidth;
    const newItemWidth = getItemWidth();
    setNumberRows(getNumberRows());
    setItemWidth(newItemWidth);
    setColumns(Math.floor(currentWidth / newItemWidth));
  };

  // Debounce function to optimize resize event handling
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  useEffect(() => {
    const debouncedUpdateGrid = debounce(updateGrid, 100);
    window.addEventListener('resize', debouncedUpdateGrid);

    // Initial grid setup on mount
    updateGrid();

    return () => {
      window.removeEventListener('resize', debouncedUpdateGrid);
    };
  }, []);

  const totalItems = numberRows * columns;

  // Inline styles for the grid container
  const gridContainerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, minmax(${itemWidth}px, 1fr))`,
    gridTemplateRows: `repeat(${numberRows}, ${itemWidth}px)`,
    gap: '0',
    zIndex: 1,
  };

  return (
    <div className="absolute" style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <div style={gridContainerStyle}>
        {Array.from({ length: totalItems }, (_, index) => (
          <div key={index} className={[classes.gridItem, classes[globalState.theme]].join(' ')} />
        ))}
      </div>
    </div>
  );
};

export default GridEffectComponent;
