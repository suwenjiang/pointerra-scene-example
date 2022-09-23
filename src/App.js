import React, { useEffect, useState } from 'react';
import jwt from '@pointerra/pointerra-jwt';
import '@pointerra/pointerra-bootstrap';

const App = () => {
  const [api, setApi] = useState(null);
  const [pointcloudId, setPointcloudId] = useState('MfRmESayqgSanCyMPNfyXj');

  useEffect(() => {
    /* eslint-disable-next-line */
    pointerra
      .loadClient({
        targetElement: '#cloud-viewer',
        pointerraAccessToken: 'e2cd30c3de82c5df380928728000dda9d9417d15',
        /* eslint-disable-next-line */
        plugins: [pointerra.Plugins.LeafletMap()],
        viewer: {
          enableTools: false,
          showFullscreenButton: true,
          showLeftPanel: false,
          showOptionsButton: true,
        },
      })
      .then(setApi);
  }, []);

  useEffect(() => {
    if (api && pointcloudId) {
      api.pointcloud.load(pointcloudId);
      api.scene.events.cameraChanged.addEventListener((cameraData) => {
        // Do something with new camera location...
        console.log('CameraChanged to:', cameraData);
      });
    }
  }, [pointcloudId, api]);

  const goToNewLocation = () => {
    const updatedCamerdata = api.scene.cameraData;
    updatedCamerdata.latitude = -27.47911292898965;
    updatedCamerdata.longitude = 153.02529501866593;
    api.scene.cameraData = updatedCamerdata;
    console.log('New Camera is:', api.scene.cameraData);
  };

  return (
    <div>
      <div id="cloud-viewer" style={{ width: '100%', height: '700px' }} />
      <button onClick={goToNewLocation}>GoTo New Location</button>
    </div>
  );
};

export default App;
