import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonListCards = (props) => (
  <ContentLoader
    viewBox="0 0 900 707"
    backgroundColor="#d1d1d1"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="300" y="10" rx="10" ry="10" width="300" height="30" />

    <rect x="50" y="60" rx="10" ry="10" width="200" height="120" />
    <rect x="50" y="189" rx="10" ry="10" width="200" height="15" />
    <rect x="50" y="211" rx="10" ry="10" width="140" height="15" />

    <rect x="350" y="60" rx="10" ry="10" width="200" height="120" />
    <rect x="350" y="189" rx="10" ry="10" width="200" height="15" />
    <rect x="350" y="211" rx="10" ry="10" width="140" height="15" />

    <rect x="650" y="60" rx="10" ry="10" width="200" height="120" />
    <rect x="650" y="189" rx="10" ry="10" width="200" height="15" />
    <rect x="650" y="211" rx="10" ry="10" width="140" height="15" />

    <rect x="50" y="260" rx="10" ry="10" width="200" height="120" />
    <rect x="50" y="389" rx="10" ry="10" width="200" height="15" />
    <rect x="50" y="411" rx="10" ry="10" width="140" height="15" />

    <rect x="350" y="260" rx="10" ry="10" width="200" height="120" />
    <rect x="350" y="389" rx="10" ry="10" width="200" height="15" />
    <rect x="350" y="411" rx="10" ry="10" width="140" height="15" />

    <rect x="650" y="260" rx="10" ry="10" width="200" height="120" />
    <rect x="650" y="389" rx="10" ry="10" width="200" height="15" />
    <rect x="650" y="411" rx="10" ry="10" width="140" height="15" />

    <rect x="50" y="460" rx="10" ry="10" width="200" height="120" />
    <rect x="50" y="589" rx="10" ry="10" width="200" height="15" />
    <rect x="50" y="611" rx="10" ry="10" width="140" height="15" />

    <rect x="350" y="460" rx="10" ry="10" width="200" height="120" />
    <rect x="350" y="589" rx="10" ry="10" width="200" height="15" />
    <rect x="350" y="611" rx="10" ry="10" width="140" height="15" />

    <rect x="650" y="460" rx="10" ry="10" width="200" height="120" />
    <rect x="650" y="589" rx="10" ry="10" width="200" height="15" />
    <rect x="650" y="611" rx="10" ry="10" width="140" height="15" />
  </ContentLoader>
);

export default SkeletonListCards;
