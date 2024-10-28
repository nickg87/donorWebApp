import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import classes from './GridEffectComponent.module.scss';

const GridEffectComponent = () => {
  const { globalState } = useAppContext();

  const getItemWidth = () => {
    return window.innerWidth > 560 ? 130 : 100;
  };

  const getNumberRows = () => {
    return window.innerWidth > 560 ? 7 : 11;
  };

  const [itemWidth, setItemWidth] = useState(getItemWidth());
  const [numberRows, setNumberRows] = useState(getNumberRows());
  const [columns, setColumns] = useState(Math.floor(window.innerWidth / itemWidth));

  const updateColumns = () => {
    const currentWidth = window.innerWidth;
    const newItemWidth = getItemWidth();
    setNumberRows(getNumberRows())
    setItemWidth(newItemWidth);
    setColumns(Math.floor(currentWidth / newItemWidth));
  };

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  useEffect(() => {
    const debouncedUpdateColumns = debounce(updateColumns, 100);
    window.addEventListener('resize', debouncedUpdateColumns);
    return () => {
      window.removeEventListener('resize', debouncedUpdateColumns);
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
    gridTemplateColumns: `repeat(${columns}, minmax(${itemWidth}px, 1fr))`, // Set number of columns and item width
    gridTemplateRows: `repeat(${numberRows}, ${itemWidth}px)`, // Maintain numberRows rows
    gap: '0',
    zIndex: 1,
  };

  return (
    <div className="absolute" style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <div style={gridContainerStyle}>
        {Array.from({ length: totalItems }, (_, index) => (
          <div key={index}
               className={[classes.gridItem, classes[globalState.theme]].join(' ')}></div>
        ))}
      </div>
    </div>
  );
};

export default GridEffectComponent;
