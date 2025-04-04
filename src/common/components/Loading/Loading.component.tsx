import React from "react";
import "./Loading.scss";

const LoadingComponent: React.FC = () => {
  return (
    <div className="loading">
      <span className="loading__dot"></span>
      <span className="loading__dot"></span>
      <span className="loading__dot"></span>
    </div>
  );
};

export default LoadingComponent;
