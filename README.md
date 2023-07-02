# React Ayrshare

[![npm package][npm-badge]][npm]

[![npm](https://img.shields.io/npm/dt/react-ayrshare)](https://www.npmjs.com/package/react-ayrshare)

[npm-badge]: https://img.shields.io/npm/v/react-ayrshare.png
[npm]: https://www.npmjs.org/package/react-ayrshare

This package simplifies the process of integrating the Ayrshare multi-user or single-user login feature into your React applications. The package opens a popup window for your end users to log in and manages communication between the popup and your application removing the need for redirect. If the end-user completes the login process by clicking "All Done", the `onSuccess` prop is triggered allowing you to execute any follow on code. If the user manually closes the popup , the `onError` prop is triggered allowing you to handle any errors. For more details, please see at [Integrating Ayrshare's API for multiple users.](https://docs.ayrshare.com/multiple-client-accounts/jwt-and-api-integration)

Take a look at: [Usage](#usage) , [Demo](#demo).

## Table of contents

- [Installation](#installation)

- [Overview](#overview)

- [Usage](#usage)

- [Demo](#demo)

- [Props](#props)

- [Known Issues](#known-issues)

## Installation

```

npm install --save react-ayrshare@latest

```

## Overview

Generate an authURL using the [/generateJWT](https://docs.ayrshare.com/rest-api/endpoints/profiles#generate-a-jwt) endpoint. _Do not specify a redirect url in the body of the post request._

call the `useAyrshare` Hook (recommended) or `Ayrshare` (render props technique) to expose `ayrshareLogin` . Pass the authURL into `ayrshareLogin` and trigger it with a button click. A popup window will appear where the user can link their social media accounts. When the user clicks "All Done", the pop up window will redirect to `redirectUri` where you should be hosting the `AyrshareCallback` component. The pop-up window will close and the `onSuccess` prop will be triggered.

## Usage

React Hooks Implementation

```tsx
import React from 'react';

import { useAyrshare } from 'react-ayrshare';

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
```

If you don't want to use hooks. This library offer render props implementation:

```tsx
import React, { useState, useEffect } from 'react';

import { Ayrshare } from 'react-ayrshare';

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
```

Then we point `redirectUri` to `AyrshareCallback`. You can use [react-router-dom](https://reactrouter.com/web) or [Next.js's file system routing](https://nextjs.org/docs/routing/introduction)

- `react-router-dom`:

```tsx
import React from 'react';

import { AyrshareCallback } from 'react-ayrshare';

import { BrowserRouter, Route } from 'react-router-dom';

function Demo() {
  return (
    <BrowserRouter>
      <Route exact path="/ayrshare" component={AyrshareCallback} />
    </BrowserRouter>
  );
}
```

- Next.js's file system routing:

```tsx
// pages/ayrshare.js

import { AyrshareCallback } from 'react-ayrshare';

export default function Demo() {
  return <AyrshareCallback />;
}
```

## Demo



https://github.com/kaliq-i/react-ayrshare/assets/41687116/7c7ebe6e-4172-4a12-b68a-d88280f71355



## Props

- `Ayrshare` component:

| Parameter   | Type     | Required | Default                                              |
| ----------- | -------- | -------- | ---------------------------------------------------- |
| redirectUri | string   | yes      |                                                      |
| authUrl     | string   | yes      |                                                      |
| onSuccess   | function | yes      |                                                      |
| onError     | function | no       |                                                      |
| children    | function | no       | Require if using `Ayrshare` component (render props) |

- `AyrshareCallback` component:

No parameters needed

## Known Issues

1. No support for IE
2. Pop-ups may be blocked by the user's browser.
3. If the user connects social media accounts and manually closes the pop-up, the onError prop is triggered. This is not a _true_ error.
