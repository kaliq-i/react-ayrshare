export interface useAyrshareType {
  redirectUri: string;
  onSuccess: () => void;
  onError?: () => void;
}

export interface AyrshareType extends useAyrshareType {
  children: ({
    ayrshareLogin,
  }: {
    ayrshareLogin: (authUrl: string) => void;
  }) => JSX.Element;
}
