import React from 'react';

import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps';

const Map = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap
        defaultZoom={5}
        defaultCenter={{ lat: 29.7604, lng: -95.3698 }}
      >
        {props.isMarkerShown && (
          <Marker
            position={{
              lat: props.mapData[0].latitude,
              lng: props.mapData[0].longitude
            }}
          />
        )}
      </GoogleMap>
    );
  })
);

export default Map;
