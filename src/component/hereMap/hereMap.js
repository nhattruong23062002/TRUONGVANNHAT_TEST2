import React, { useEffect, useRef } from "react";

const HereMap = ({ users }) => {
  const mapRef = useRef(null); 
  const mapInstance = useRef(null); 
  const uiInstance = useRef(null); 
  const H = window.H;

  useEffect(() => {
    const initializeMap = () => {
      const platform = new H.service.Platform({
        apikey: "YYhBIfjPzd_UVbQc5jNjT_pAVcWP_VpAiPPpLIflh30",
      });

      const defaultLayers = platform.createDefaultLayers();

      mapInstance.current = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        center: { lat: 20.5937, lng: 78.9629 },
        zoom: 4,
        pixelRatio: window.devicePixelRatio || 1,
      });

      new H.mapevents.Behavior(new H.mapevents.MapEvents(mapInstance.current));

      uiInstance.current = H.ui.UI.createDefault(mapInstance.current, defaultLayers);

    };

    const timeout = setTimeout(() => {
      initializeMap();
    }, 100);

    return () => {
      clearTimeout(timeout); 
      if (mapInstance.current) {
        mapInstance.current.dispose(); 
        mapInstance.current = null;
      }
      uiInstance.current = null;
    };
  }, []); 

  useEffect(() => {
    if (!mapInstance.current || !uiInstance.current || !users) {
      return;
    }
    mapInstance.current.removeObjects(mapInstance.current.getObjects());
    users.forEach((user) => {
      const latitude = parseFloat(user.location.coordinates.latitude);
      const longitude = parseFloat(user.location.coordinates.longitude);

      if (!isNaN(latitude) && !isNaN(longitude)) {
        const marker = new H.map.Marker({ lat: latitude, lng: longitude });

        marker.addEventListener("pointerenter", (evt) => {
          const bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
            content: `
              <div style="width: 200px;">
                <strong>${user.name.first} ${user.name.last}</strong><br/>
                Age: ${user.dob.age}<br/>
                Gender: ${user.gender}<br/>
                Region: ${user.location.city}, ${user.location.country}
              </div>
            `,
          });
          uiInstance.current.addBubble(bubble);

          marker.addEventListener("pointerleave", () => {
            uiInstance.current.removeBubble(bubble);
          });
        });

        mapInstance.current.addObject(marker);
      } else {
        console.warn("Invalid coordinates for user:", user);
      }
    });
  }, [users]); 

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "600px" }}
    ></div>
  );
};

export default HereMap;
