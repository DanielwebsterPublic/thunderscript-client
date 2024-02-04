import createClient from 'openapi-fetch';
import type { paths } from './generated/thunder-client';
import { readImageToBuffer } from './imageUtil';

export async function thunderClient(baseUrl: string = 'http://127.0.0.1:8111') {
  const { GET } = createClient<paths>({
    baseUrl: baseUrl,
  });
  async function getState() {
    const { data, error } = await GET('/state');
    if (error) throw new Error(error);
    return data;
  }
  async function getIndicators() {
    const { data, error } = await GET('/indicators');
    if (error) throw new Error(error);
    return data;
  }
  async function getMapInfo() {
    const { data, error } = await GET('/map_info.json');
    if (error) throw new Error(error);
    return data;
  }
  async function getMission() {
    const { data, error } = await GET('/mission.json');
    if (error) throw new Error(error);
    return data;
  }
  async function getMapObjects() {
    const { data, error } = await GET('/map_obj.json');
    if (error) throw new Error(error);
    return data;
  }
  async function getMapImage(gen: number = 1) {
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
  async function getGameChat(lastId: number) {
    const { data, error } = await GET('/gamechat', {
      params: {
        query: {
          lastId: 0,
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
