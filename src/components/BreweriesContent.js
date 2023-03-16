import React from 'react';
import { useLocation } from 'react-router-dom';
import BreweriesList from './BreweriesList';
import BreweryDetail from './BreweryDetail';

const BreweriesContent = () => {
  const location = useLocation();
  if (location.pathname.includes('/details/')) {
    const id = location.pathname.split('/').pop();
    return <BreweryDetail id={id} />;
  } else {
    return <BreweriesList />;
  }
};

export default BreweriesContent;
