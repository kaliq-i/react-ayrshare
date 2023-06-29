import { AyrshareType } from './types';
import { useAyrshare } from './useAyrshare';

export function Ayrshare({
  children,
  redirectUri,
  onSuccess,
  onError,
}: AyrshareType) {
  const { ayrshareLogin } = useAyrshare({
    redirectUri,
    onSuccess,
    onError,
  });
  return children({ ayrshareLogin });
}
