import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonTable = (props) => (
  <ContentLoader
    // width={1500}
    // height={400}
    viewBox="0 0 1500 400"
    backgroundColor="#d1d1d1"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* <rect x="27" y="139" rx="4" ry="4" width="20" height="20" /> */}
    <rect x="27" y="140" rx="10" ry="10" width="85" height="19" />
    <rect x="147" y="141" rx="10" ry="10" width="169" height="19" />
    <rect x="356" y="140" rx="10" ry="10" width="85" height="19" />
    <rect x="482" y="141" rx="10" ry="10" width="169" height="19" />
    <rect x="697" y="139" rx="10" ry="10" width="85" height="19" />
    <rect x="1070" y="138" rx="10" ry="10" width="85" height="19" />

    {/* <rect x="26" y="196" rx="4" ry="4" width="20" height="20" /> */}
    <rect x="26" y="197" rx="10" ry="10" width="85" height="19" />
    <rect x="147" y="198" rx="10" ry="10" width="169" height="19" />
    <rect x="356" y="197" rx="10" ry="10" width="85" height="19" />
    <rect x="482" y="198" rx="10" ry="10" width="169" height="19" />
    <rect x="697" y="196" rx="10" ry="10" width="85" height="19" />
    <rect x="1070" y="195" rx="10" ry="10" width="85" height="19" />
    
    {/* <circle cx="1456" cy="203" r="12" /> */}

    {/* <rect x="26" y="258" rx="4" ry="4" width="20" height="20" /> */}
    <rect x="26" y="259" rx="10" ry="10" width="85" height="19" />
    <rect x="147" y="260" rx="10" ry="10" width="169" height="19" />
    <rect x="356" y="259" rx="10" ry="10" width="85" height="19" />
    <rect x="482" y="260" rx="10" ry="10" width="169" height="19" />
    <rect x="697" y="258" rx="10" ry="10" width="85" height="19" />
    <rect x="1070" y="257" rx="10" ry="10" width="85" height="19" />

    {/* <circle cx="1456" cy="265" r="12" /> */}

    {/* <rect x="26" y="316" rx="4" ry="4" width="20" height="20" /> */}
    <rect x="26" y="317" rx="10" ry="10" width="85" height="19" />
    <rect x="147" y="318" rx="10" ry="10" width="169" height="19" />
    <rect x="356" y="317" rx="10" ry="10" width="85" height="19" />
    <rect x="482" y="318" rx="10" ry="10" width="169" height="19" />
    <rect x="697" y="316" rx="10" ry="10" width="85" height="19" />
    <rect x="1070" y="315" rx="10" ry="10" width="85" height="19" />

    {/* <circle cx="1456" cy="323" r="12" /> */}

    {/* <rect x="26" y="379" rx="4" ry="4" width="20" height="20" /> */}
    <rect x="26" y="380" rx="10" ry="10" width="85" height="19" />
    <rect x="147" y="381" rx="10" ry="10" width="169" height="19" />
    <rect x="356" y="380" rx="10" ry="10" width="85" height="19" />
    <rect x="482" y="381" rx="10" ry="10" width="169" height="19" />
    <rect x="697" y="379" rx="10" ry="10" width="85" height="19" />
    <rect x="1070" y="378" rx="10" ry="10" width="85" height="19" />

    {/* <circle cx="1456" cy="386" r="12" /> */}

    <rect x="828" y="138" rx="10" ry="10" width="199" height="19" />
    <rect x="827" y="195" rx="10" ry="10" width="199" height="19" />
    <rect x="827" y="257" rx="10" ry="10" width="199" height="19" />
    <rect x="827" y="315" rx="10" ry="10" width="199" height="19" />
    <rect x="827" y="378" rx="10" ry="10" width="199" height="19" />

    <rect x="1183" y="139" rx="10" ry="10" width="85" height="19" />
    <rect x="1182" y="196" rx="10" ry="10" width="85" height="19" />
    <rect x="1182" y="258" rx="10" ry="10" width="85" height="19" />
    <rect x="1182" y="316" rx="10" ry="10" width="85" height="19" />
    <rect x="1182" y="379" rx="10" ry="10" width="85" height="19" />
    <rect x="1305" y="137" rx="10" ry="10" width="85" height="19" />
    <rect x="1304" y="194" rx="10" ry="10" width="85" height="19" />
    <rect x="1304" y="256" rx="10" ry="10" width="85" height="19" />
    <rect x="1304" y="314" rx="10" ry="10" width="85" height="19" />
    <rect x="1304" y="377" rx="10" ry="10" width="85" height="19" />

    <rect x="26" y="23" rx="5" ry="5" width="70" height="30" />
    
    <rect x="1260" y="23" rx="10" ry="10" width="134" height="30" />
  </ContentLoader>
);

export default SkeletonTable;
