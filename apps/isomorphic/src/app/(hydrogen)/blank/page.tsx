// components/BackgroundAnimation.tsx
import React from 'react';
import './BackgroundAnimation.css';

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="cards animate-border inline-block rounded-md bg-white bg-gradient-to-r from-white to-gray-500 bg-[length:400%_400%] p-1">
        <div className="card red">
          <p className="tip">Hover Me</p>
          <p className="second-text">Lorem Ipsum</p>
        </div>
        <div className="card red">
          <p className="tip">Hover Me</p>
          <p className="second-text">Lorem Ipsum</p>
        </div>{' '}
        <div className="card red">
          <p className="tip">Hover Me</p>
          <p className="second-text">Lorem Ipsum</p>
        </div>
        <div className="card blue">
          <p className="tip">Hover Me</p>
          <p className="second-text">Lorem Ipsum</p>
        </div>
        <div className="card green">
          <p className="tip">Hover Me</p>
          <p className="second-text">Lorem Ipsum</p>
        </div>
      </div>
    </div>
  );
};

export default BackgroundAnimation;
