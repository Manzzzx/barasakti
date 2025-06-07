'use client';

import React from 'react';
import Navigation from './Navigation';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return <Navigation className={className} />;
};

export default Header;