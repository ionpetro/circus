import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const Map = () => {
  console.log(process.env.NEXT_PUBLIC_MAPS_API_KEY);
  const googlemap = useRef(null);
  useEffect(() => {
    const uluru = { lat: 38.02223108963978, lng: 23.737017582604235 };

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
      version: 'weekly',
    });
    let map;
    loader.load().then(() => {
      const google = window.google;
      map = new google.maps.Map(googlemap.current, {
        mapId: 'ad425f3038d3c4c0',
        center: uluru,
        disableDefaultUI: true,
        zoom: 16,
      });
      new google.maps.Marker({
        position: uluru,
        icon: 'https://res.cloudinary.com/ionpetro/image/upload/v1627764951/circus_lsu3u9.png',
        map: map,
      });
    });
  });
  return <div id="map" ref={googlemap} />;
};

export default Map;
