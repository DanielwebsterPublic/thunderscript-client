import createClient from "openapi-fetch";
import type { paths } from "./generated/thunder-client";

const { GET } = createClient<paths>({ baseUrl: "http://localhost:8111" });

export async function getGameChat(lastId: number) {
    const { data, error } = await GET("/gamechat", {
        params: {
            query: {
                lastId: 0
            }
        },
    });
    if (error) throw new Error(error);
    return data;
}

export async function getState() {
    const { data, error } = await GET("/state");
    if (error) throw new Error(error);
    return data;
}

export async function getMapInfo() {
    const { data, error } = await GET("/map_info.json");
    if (error) throw new Error(error);
    return data;
}

export async function getMapImage() {
    const { data, error } = await GET("/map.img", {
        params: {
            query: {
                gen: 1
            }
        },
    });
    if (error) throw new Error(error);
    return data;
}
