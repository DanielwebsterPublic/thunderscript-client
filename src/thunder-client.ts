import createClient from 'openapi-fetch';
import type { paths } from './generated/thunder-client';
import { readImageToBuffer } from './imageUtil';

export type MapInfo =
  paths['/map_info.json']['get']['responses']['200']['content']['application/json'];

export type Mission =
  paths['/mission.json']['get']['responses']['200']['content']['application/json'];

export type MapObjects =
  paths['/map_obj.json']['get']['responses']['200']['content']['application/json'];

export type Hudmsg = paths['/hudmsg']['get']['responses']['200']['content']['application/json'];

export type GameChat = paths['/gamechat']['get']['responses']['200']['content']['application/json'];

export type State = paths['/state']['get']['responses']['200']['content']['application/json'];

export type Indicators =
  paths['/indicators']['get']['responses']['200']['content']['application/json'];

export interface ThunderClient {
  /**
   * Get the current state of the game.
   * This returns information about how the player is
   * controlling the vehicle, and the current state of the vehicle.
   */
  getState(): Promise<State>;
  /**
   * Get the current indicators of the vehicle.
   * This returns information about the vehicle's speed, RPM, etc.
   */
  getIndicators(): Promise<Indicators>;
  /**
   * Get information about the current map.
   */
  getMapInfo(): Promise<MapInfo>;
  /**
   * Get information about the current mission.
   */
  getMission(): Promise<Mission>;
  /**
   * Get information about the objects in the current map.
   * This includes information about the other vehicles, the player's vehicle,
   * and objectives in the map.
   */
  getMapObjects(): Promise<MapObjects>;
  /**
   * Get an image of the current map.
   * @param gen - The generation of the map image to get this can be found
   * by calling the @link getMapInfo function and using the `gen` property.
   */
  getMapImage(gen: number): Promise<Buffer>;
  /**
   * Get the current HUD messages.
   * These include the battle log, and in game events.
   * @param lastEvt - The last event id to get messages from.
   * @param lastDmg - The last damage id to get messages from.
   */
  getHudmsg({ lastEvt, lastDmg }: { lastEvt?: number; lastDmg?: number }): Promise<Hudmsg>;
  /**
   * Get the current game chat messages.
   * @param lastId - The last message id to get messages from.
   */
  getGameChat(lastId: number): Promise<GameChat>;
}

/**
 * Create a new thunder client to access the war thunder localhost server.
 * @param baseUrl the url to the war thunder localhost server
 * @returns
 */
export function thunderClient(baseUrl: string = 'http://127.0.0.1:8111'): ThunderClient {
  const { GET } = createClient<paths>({
    baseUrl: baseUrl,
  });
  async function getState(): Promise<State> {
    const { data, error } = await GET('/state');
    if (error) throw new Error(error);
    return data;
  }
  async function getIndicators(): Promise<Indicators> {
    const { data, error } = await GET('/indicators');
    if (error) throw new Error(error);
    return data;
  }
  async function getMapInfo(): Promise<MapInfo> {
    const { data, error } = await GET('/map_info.json');
    if (error) throw new Error(error);
    return data;
  }
  async function getMission(): Promise<Mission> {
    const { data, error } = await GET('/mission.json');
    if (error) throw new Error(error);
    return data;
  }
  async function getMapObjects(): Promise<MapObjects> {
    const { data, error } = await GET('/map_obj.json');
    if (error) throw new Error(error);
    return data;
  }
  async function getMapImage(gen: number = 1): Promise<Buffer> {
    const resp = await fetch(`${baseUrl}/map.img?gen=${gen}`);
    if (!resp.body) {
      throw new Error('Failed to get image, response body was empty.');
    }
    return readImageToBuffer(resp.body);
  }
  async function getHudmsg({ lastEvt, lastDmg }: { lastEvt?: number; lastDmg?: number }) {
    const { data, error } = await GET('/hudmsg', {
      params: {
        query: {
          lastEvt,
          lastDmg,
        },
      },
    });
    if (error) throw new Error(error);
    return data;
  }
  async function getGameChat(lastId: number): Promise<GameChat> {
    const { data, error } = await GET('/gamechat', {
      params: {
        query: {
          lastId,
        },
      },
    });
    if (error) throw new Error(error);
    return data;
  }
  return {
    getState,
    getIndicators,
    getMapInfo,
    getMission,
    getMapObjects,
    getMapImage,
    getHudmsg,
    getGameChat,
  };
}
