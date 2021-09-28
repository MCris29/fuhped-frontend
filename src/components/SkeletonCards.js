import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonCards = (props) => (
  <ContentLoader
    viewBox="0 0 900 307"
    backgroundColor="#d1d1d1"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="340" y="20" rx="10" ry="10" width="220" height="20" />

    <rect x="50" y="60" rx="10" ry="10" width="200" height="120" />
    <rect x="50" y="189" rx="10" ry="10" width="200" height="15" />
    <rect x="50" y="211" rx="10" ry="10" width="140" height="15" />

    <rect x="350" y="60" rx="10" ry="10" width="200" height="120" />
    <rect x="350" y="189" rx="10" ry="10" width="200" height="15" />
    <rect x="350" y="211" rx="10" ry="10" width="140" height="15" />

    <rect x="650" y="60" rx="10" ry="10" width="200" height="120" />
    <rect x="650" y="189" rx="10" ry="10" width="200" height="15" />
    <rect x="650" y="211" rx="10" ry="10" width="140" height="15" />
  </ContentLoader>
);

export default SkeletonCards;
