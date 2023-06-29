import React from 'react';

import { useAyrshare } from '../src/useAyrshare';

function AyrsharePage() {
  const { ayrshareLogin } = useAyrshare({
    redirectUri: `${window.location.origin}/ayrshare`,
    onSuccess: () => {
      // do something
    },
    onError: () => {
      // handle error
    },
  });

  const someApiCall = () => {
    return {
      authUrl: '', //authURL is url from this endpoint https://docs.ayrshare.com/rest-api/endpoints/profiles#generate-a-jwt.
    };
  };

  const connectSocials = () => {
    const { authUrl } = someApiCall();
    ayrshareLogin(authUrl);
  };

  return (
    <div>
      hooks
      <br />
      <button
        onClick={connectSocials}
        alt="Connect Socials"
        style={{ maxWidth: '180px', cursor: 'pointer' }}
      >
        Connect your socials!
      </button>
    </div>
  );
}

export default AyrsharePage;
