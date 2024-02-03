export { thunderClient } from './thunder-client';

import { thunderClient } from './thunder-client';

thunderClient().then(async (client) => {
  const state = await client.getState();
  console.log(state);
});
