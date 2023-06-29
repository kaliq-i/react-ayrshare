import { useCallback, useEffect, useRef, useState } from 'react';
import { useAyrshareType } from './types';

const getPopupPositionProperties = ({ width = 600, height = 600 }) => {
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  return `left=${left},top=${top},width=${width},height=${height}`;
};

export function useAyrshare({
  redirectUri,
  onSuccess,
  onError,
}: useAyrshareType) {
  const popupRef = useRef<Window | null>(null);
  const popUpIntervalRef = useRef<number | null>(null);
  const [hasUserClickedDone, setHasUserClickedDone] = useState(false);

  const receiveMessage = useCallback(
    (event: MessageEvent) => {
      if (event.origin === window.location.origin) {
        if (event.data.code === 'error' && event.data.from === 'Ayrshare') {
          onError && onError();
          popupRef.current && popupRef.current.close();
        } else if (
          event.data.code === 'success' &&
          event.data.from === 'Ayrshare'
        ) {
          setHasUserClickedDone(true);
          onSuccess && onSuccess();
          popupRef.current && popupRef.current.close();
          setHasUserClickedDone(false);
        }
      }
    },
    [onError, onSuccess],
  );

  useEffect(() => {
    return () => {
      window.removeEventListener('message', receiveMessage, false);

      if (popupRef.current) {
        popupRef.current.close();
        popupRef.current = null;
      }
      if (popUpIntervalRef.current) {
        window.clearInterval(popUpIntervalRef.current);
        popUpIntervalRef.current = null;
      }
    };
  }, [receiveMessage]);

  useEffect(() => {
    window.addEventListener('message', receiveMessage, false);
    return () => {
      window.removeEventListener('message', receiveMessage, false);
    };
  }, [receiveMessage]);

  const getUrl = (authUrl: string) => {
    const ayrshareAuthLink = `${authUrl}&redirect=${redirectUri}`;
    return ayrshareAuthLink;
  };

  const ayrshareLogin = (authUrl: string) => {
    popupRef.current?.close();
    popupRef.current = window.open(
      getUrl(authUrl),
      '_blank',
      getPopupPositionProperties({ width: 600, height: 600 }),
    );

    if (popUpIntervalRef.current) {
      window.clearInterval(popUpIntervalRef.current);
      popUpIntervalRef.current = null;
    }

    popUpIntervalRef.current = window.setInterval(() => {
      try {
        if (popupRef.current && popupRef.current.closed) {
          if (!hasUserClickedDone && onError) {
            onError();
          }
          if (popUpIntervalRef.current !== null) {
            window.clearInterval(popUpIntervalRef.current);
            popUpIntervalRef.current = null;
          }
        }
      } catch (error) {
        console.error(error);
        if (popUpIntervalRef.current !== null) {
          window.clearInterval(popUpIntervalRef.current);
          popUpIntervalRef.current = null;
        }
      }
    }, 1000);
  };

  return {
    ayrshareLogin,
  };
}
