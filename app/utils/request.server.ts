import {data} from "@remix-run/node";
/**
 * This helper function helps us to return the accurate HTTP status,
 * 400 Bad Request, to the client.
 */
export const badRequest = <T>(json: T) =>
    data<T>(json, { status: 400 });
