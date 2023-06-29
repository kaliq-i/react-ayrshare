import React, { useState, useEffect } from 'react';
import { Ayrshare } from '../src/Ayrshare';

function AyrsharePage() {
  const [authUrl, setAuthUrl] = useState('');

  useEffect(() => {
    const fetchAuthUrl = async () => {
      const response = await fetch('https://api.yourwebsite.com/your_endpoint');

      if (response.ok) {
        const data = await response.json();
        setAuthUrl(data.url); //authURL is url from this endpoint https://docs.ayrshare.com/rest-api/endpoints/profiles#generate-a-jwt.
      } else {
        // Handle error
      }
    };

    fetchAuthUrl();
  }, []);

  return (
    <div>
      render props
      <br />
      <Ayrshare
        redirectUri={`${window.location.origin}/ayrshare`}
        onSuccess={() => {
          // do something
        }}
        onError={() => {
          // handle error
        }}
      >
        {({ ayrshareLogin }) => (
          <button
            onClick={() => ayrshareLogin(authUrl)}
            alt="Connect Socials"
            style={{ maxWidth: '180px', cursor: 'pointer' }}
          >
            Connect your socials!
          </button>
        )}
      </Ayrshare>
    </div>
  );
}

export default AyrsharePage;
