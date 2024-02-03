# thunderscript-client

War Thunder Localhost Client

# Installation

The project is available on [npm](https://www.npmjs.com/package/thunderscript-client). To install the package run the following command:

```sh
yarn add thunderscript-client
```

# Usage

The package provides a client to interact with the War Thunder Localhost API. The client is a wrapper around the API and provides a more user-friendly interface.

```typescript
import { thunderClient } from './thunder-client';

thunderClient().then(async (client) => {
  const state = await client.getState();
  console.log(state);
});
```

```json
{
  "valid": true,
  "aileron, %": -0,
  "elevator, %": -7,
  "rudder, %": 2,
  "flaps, %": 0,
  "gear, %": 0,
  "airbrake, %": 0,
  "H, m": 5194,
  "TAS, km/h": 1544,
  "IAS, km/h": 1185,
  "M": 1.34,
  "AoA, deg": -0.8,
  "AoS, deg": 0.1,
  "Ny": 1.34,
  "Vy, m/s": 80.3,
  "Wx, deg/s": 0,
  "Mfuel, kg": 3341,
  "Mfuel0, kg": 9400,
  "throttle 1, %": 110,
  "power 1, hp": 0,
  "RPM 1": 8350,
  "manifold pressure 1, atm": 1,
  "oil temp 1, C": 92,
  "thrust 1, kgs": 16535,
  "efficiency 1, %": 0,
  "throttle 2, %": 110,
  "power 2, hp": 0,
  "RPM 2": 8350,
  "manifold pressure 2, atm": 1,
  "oil temp 2, C": 92,
  "thrust 2, kgs": 16535,
  "efficiency 2, %": 0
}
```

# Development

The Project uses [Yarn](https://yarnpkg.com/) as a package manager. To install the dependencies run the following command:

```sh
yarn install
```

# Development

API code is generated using openapi-typescript. This relies on the [OpenAPI 3.0](https://swagger.io/specification/) specification. The specification is located in the `src/openapi/war-thunder-localhost.yaml` file.

## Build

Builds the project by generating the API code and then compiling the typescript code.

```sh
yarn build
```

## Testing

Open War Thunder and start a test flight (I used the su-27) and then run the following command:

```sh
yarn test
```
