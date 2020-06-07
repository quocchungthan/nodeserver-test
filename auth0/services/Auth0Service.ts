import { IAuth0ApiService } from "../characteristic/services/IAuth0ApiService";
import { service } from "@cbto/rest-helper";
import { IUserFromAccessToken } from "../characteristic/model/IUserFromAccessToken";
import { useJsonConfig } from "@cbto/rest-helper/dist/lib/util/Configuration";

@service
export class Auth0Service extends IAuth0ApiService {
  getUserFromAccessToken(accessToken: string): Promise<IUserFromAccessToken> {
    return new Promise<any>((resolve, reject) => {
      const clientObject = require("node-rest-client").Client;
      const client = new clientObject();
      const headers: any = {
        "Content-Type": "application/json",
      };
      headers.Authorization = `Bearer ${accessToken}`;
      const args = {
        headers,
      };
      client.get(
        useJsonConfig("auth0.domain") + "userinfo",
        args,
        (data: any) => {
          if (Buffer.isBuffer(data)) {
            data = data.toString("utf8");
            reject(data);
          } else if (data.error) {
            reject(JSON.stringify(data));
          } else {
            resolve(data);
          }
        }
      );
    });
  }
}
