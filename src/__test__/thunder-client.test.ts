import path from 'path';
import { thunderClient } from '../thunder-client';

import fs from 'fs';

const payloadFolder = path.join(__dirname, 'data');
// Set to true to update the test payloads
const integrationMode = false;

function writePayload(name: string, data: any) {
  if (integrationMode) {
    fs.writeFileSync(`${payloadFolder}/${name}.json`, JSON.stringify(data, null, 2));
  }
}

const chunks = Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
let i = 0;
const mockReadableStream = {
  getReader: jest.fn().mockReturnValue({
    read: jest.fn().mockResolvedValue({ done: true, value: chunks[i++] }),
  }),
};

function useMockResponses() {
  const statePayload = require(path.join(payloadFolder, 'state.json'));
  const mapInfoPayload = require(path.join(payloadFolder, 'mapInfo.json'));
  const indicatorsPayload = require(path.join(payloadFolder, 'indicators.json'));
  const mapObjectsPayload = require(path.join(payloadFolder, 'mapObjects.json'));
  const missionPayload = require(path.join(payloadFolder, 'mission.json'));
  const gameChatPayload = require(path.join(payloadFolder, 'gameChat.json'));
  const hudmsgPayload = require(path.join(payloadFolder, 'hudmsg.json'));
  jest.mock('openapi-fetch', () => {
    return jest.fn().mockImplementation(() => {
      return {
        GET: jest.fn().mockImplementation((path: string) => {
          if (path === '/state') {
            return { data: statePayload, error: null };
          }
          if (path === '/map_info.json') {
            return { data: mapInfoPayload, error: null };
          }
          if (path === '/indicators') {
            return { data: indicatorsPayload, error: null };
          }
          if (path === '/map_obj.json') {
            return { data: mapObjectsPayload, error: null };
          }
          if (path === '/mission.json') {
            return { data: missionPayload, error: null };
          }
          if (path === '/gamechat') {
            return { data: gameChatPayload, error: null };
          }
          if (path === '/hudmsg') {
            return { data: hudmsgPayload, error: null };
          }
          if (path === '/map.img?gen=1') {
            return Promise.resolve({ data: mockReadableStream, error: 'Unknown path' });
          }
          return Promise.resolve({ data: null, error: 'Unknown path' });
        }),
      };
    });
  });
}

describe('ThunderClient', () => {
  beforeEach(() => {
    if (!integrationMode) useMockResponses();
  });

  it('gets the map info', async () => {
    const { getMapInfo } = await thunderClient();
    const mapInfo = await getMapInfo();
    expect(mapInfo).toBeDefined();
    writePayload('mapInfo', mapInfo);
    expect(mapInfo).toMatchObject({
      grid_size: expect.arrayContaining([expect.any(Number)]),
      grid_steps: expect.arrayContaining([expect.any(Number)]),
      grid_zero: expect.arrayContaining([expect.any(Number)]),
      hud_type: expect.any(Number),
      map_generation: expect.any(Number),
      map_max: expect.arrayContaining([expect.any(Number)]),
      map_min: expect.arrayContaining([expect.any(Number)]),
      valid: true,
    });
  });

  it('gets the map image', async () => {
    const { getMapImage } = await thunderClient();
    const mapImage = await getMapImage();
    expect(mapImage).toBeDefined();
    // fs.writeFileSync(`${payloadFolder}/mapImage.png`, mapImage);
    expect(mapImage).toMatchObject(expect.any(Buffer));
  });

  it('gets the game chat', async () => {
    const { getGameChat } = await thunderClient();
    const gameChat = await getGameChat(0);
    writePayload('gameChat', gameChat);

    expect(gameChat).toBeDefined();
    expect(gameChat).toMatchObject(expect.any(Object));
  });

  it('gets the hudmsg', async () => {
    const { getHudmsg } = await thunderClient();
    const hudmsg = await getHudmsg({ lastEvt: 0, lastDmg: 0 });
    writePayload('hudmsg', hudmsg);
    expect(hudmsg).toBeDefined();
    expect(hudmsg).toMatchObject({
      damage: expect.any(Object),
      events: expect.any(Object),
    });
  });

  it('gets Map Objects', async () => {
    const { getMapObjects } = await thunderClient();
    const mapObjects = await getMapObjects();
    writePayload('mapObjects', mapObjects);
    expect(mapObjects).toBeDefined();
    expect(mapObjects).toMatchObject(expect.arrayContaining([expect.any(Object)]));
  });

  it('gets the indicators', async () => {
    const { getIndicators } = await thunderClient();
    const indicators = await getIndicators();
    writePayload('indicators', indicators);
    expect(indicators).toBeDefined();
    expect(indicators).toMatchObject(
      expect.objectContaining({
        altitude1_10k: expect.any(Number),
        altitude_10k: expect.any(Number),
        altitude_min: expect.any(Number),
        aoa: expect.any(Number),
        aviahorizon_pitch: expect.any(Number),
        aviahorizon_roll: expect.any(Number),
        bank: expect.any(Number),
        bank1: expect.any(Number),
        clock_hour: expect.any(Number),
        clock_min: expect.any(Number),
        clock_sec: expect.any(Number),
        compass: expect.any(Number),
        compass1: expect.any(Number),
        flaps: expect.any(Number),
        flaps1: expect.any(Number),
        fuel: expect.any(Number),
        fuel1: expect.any(Number),
        g_meter: expect.any(Number),
        g_meter_max: expect.any(Number),
        g_meter_min: expect.any(Number),
        gears: expect.any(Number),
        mach: expect.any(Number),
        mach1: expect.any(Number),
        pedals: expect.any(Number),
        pedals1: expect.any(Number),
        radio_altitude: expect.any(Number),
        rpm: expect.any(Number),
        rpm1: expect.any(Number),
        speed: expect.any(Number),
        stick_ailerons: expect.any(Number),
        stick_elevator: expect.any(Number),
        throttle: expect.any(Number),
        throttle1: expect.any(Number),
        turn: expect.any(Number),
        type: expect.any(String),
        valid: expect.any(Boolean),
        vario: expect.any(Number),
        water_temperature: expect.any(Number),
        water_temperature1: expect.any(Number),
        water_temperature1_min: expect.any(Number),
        water_temperature_min: expect.any(Number),
      }),
    );
  });
  it('gets the state', async () => {
    const { getState } = await thunderClient();
    const state = await getState();
    writePayload('state', state);
    expect(state).toBeDefined();
    expect(state).toMatchObject(
      expect.objectContaining({
        'AoA, deg': expect.any(Number),
        'AoS, deg': expect.any(Number),
        'H, m': expect.any(Number),
        'IAS, km/h': expect.any(Number),
        M: expect.any(Number),
        'Mfuel, kg': expect.any(Number),
        'Mfuel0, kg': expect.any(Number),
        Ny: expect.any(Number),
        'RPM 1': expect.any(Number),
        'RPM 2': expect.any(Number),
        'TAS, km/h': expect.any(Number),
        'Vy, m/s': expect.any(Number),
        'Wx, deg/s': expect.any(Number),
        'aileron, %': expect.any(Number),
        'airbrake, %': expect.any(Number),
        'efficiency 1, %': expect.any(Number),
        'efficiency 2, %': expect.any(Number),
        'elevator, %': expect.any(Number),
        'flaps, %': expect.any(Number),
        'gear, %': expect.any(Number),
        'manifold pressure 1, atm': expect.any(Number),
        'manifold pressure 2, atm': expect.any(Number),
        'oil temp 1, C': expect.any(Number),
        'oil temp 2, C': expect.any(Number),
        'power 1, hp': expect.any(Number),
        'power 2, hp': expect.any(Number),
        'rudder, %': expect.any(Number),
        'throttle 1, %': expect.any(Number),
        'throttle 2, %': expect.any(Number),
        'thrust 1, kgs': expect.any(Number),
        'thrust 2, kgs': expect.any(Number),
        valid: expect.any(Boolean),
      }),
    );
  });

  it('gets the mission', async () => {
    const { getMission } = await thunderClient();
    const mission = await getMission();
    writePayload('mission', mission);
    expect(mission).toBeDefined();
    expect(mission).toMatchObject({ objectives: null, status: expect.any(String) });
  });
});
