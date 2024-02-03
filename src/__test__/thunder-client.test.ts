import { thunderClient } from '../thunder-client';

describe('ThunderClient', () => {
  it('gets the map info', async () => {
    const { getMapInfo } = await thunderClient();
    const mapInfo = await getMapInfo();
    expect(mapInfo).toBeDefined();
    // Use Matchers to validate the response
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
    // Use Matchers to validate the response
    expect(mapImage).toMatchObject(expect.any(Buffer));
  });

  it('gets the game chat', async () => {
    const { getGameChat } = await thunderClient();
    const gameChat = await getGameChat(0);
    expect(gameChat).toBeDefined();
    expect(gameChat).toMatchObject(expect.any(Object));
  });

  it('gets the hudmsg', async () => {
    const { getHudmsg } = await thunderClient();
    const hudmsg = await getHudmsg({ lastEvt: 0, lastDmg: 0 });
    expect(hudmsg).toBeDefined();
    expect(hudmsg).toMatchObject({
      damage: expect.any(Object),
      events: expect.any(Object),
    });
  });

  it('gets Map Objects', async () => {
    const { getMapObjects } = await thunderClient();
    const mapObjects = await getMapObjects();
    expect(mapObjects).toBeDefined();
    expect(mapObjects).toMatchObject(expect.arrayContaining([expect.any(Object)]));
  });

  it('gets the indicators', async () => {
    const { getIndicators } = await thunderClient();
    const indicators = await getIndicators();
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
  // {"AoA, deg": -0.8, "AoS, deg": 0.1, "H, m": 5194, "IAS, km/h": 1185, "M": 1.34, "Mfuel, kg": 3341, "Mfuel0, kg": 9400, "Ny": 1.34, "RPM 1": 8350, "RPM 2": 8350, "TAS, km/h": 1544, "Vy, m/s": 80.3, "Wx, deg/s": 0, "aileron, %": -0, "airbrake, %": 0, "efficiency 1, %": 0, "efficiency 2, %": 0, "elevator, %": -7, "flaps, %": 0, "gear, %": 0, "manifold pressure 1, atm": 1, "manifold pressure 2, atm": 1, "oil temp 1, C": 92, "oil temp 2, C": 92, "power 1, hp": 0, "power 2, hp": 0, "rudder, %": 2, "throttle 1, %": 110, "throttle 2, %": 110, "thrust 1, kgs": 16535, "thrust 2, kgs": 16535, "valid": true}
  it('gets the state', async () => {
    const { getState } = await thunderClient();
    const state = await getState();
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
    expect(mission).toBeDefined();
    expect(mission).toMatchObject({ objectives: null, status: expect.any(String) });
  });
});
