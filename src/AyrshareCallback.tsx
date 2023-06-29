import { useEffect } from 'react';

export function AyrshareCallback() {
  useEffect(() => {
    window.opener &&
      window.opener.postMessage(
        { code: 'success', from: 'Ayrshare' },
        window.location.origin,
      );
  }, []);

  return <div>Redirecting....</div>;
}
