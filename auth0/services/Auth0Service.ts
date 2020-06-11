import { IAuth0Service } from "../characteristic/services/IAuth0Service";
import { service, useService, logDebug } from "@cbto/rest-helper";
import { IAuth0ApiService } from "../characteristic/services/IAuth0ApiService";
import e from "express";
import { IUserFromAccessToken } from "../characteristic/model/IUserFromAccessToken";
import { useJsonConfig } from "@cbto/rest-helper/dist/lib/util/Configuration";

@service
export class Auth0Service extends IAuth0Service {
  async isAuthenticated(accessToken: string): Promise<IUserFromAccessToken> {
    const apiService = useService<IAuth0ApiService>(IAuth0ApiService);
    try {
      const userFromToken = await apiService.getUserFromAccessToken(
        accessToken
      );

      if (!this.isAdmin(userFromToken)) {
        throw "Not admin";
      }

      if (userFromToken?.sub) {
        logDebug(
          `Request from ${userFromToken.sub} - ${userFromToken.given_name} ${userFromToken.family_name} - ${userFromToken.email}`
        );
        return userFromToken;
      } else {
        throw "Can not find user from access token";
      }
    } catch (err) {
      logDebug(err);
      throw err;
    }
  }

  private isAdmin(user: IUserFromAccessToken) {
    const adminId = useJsonConfig("admin");

    return adminId === user?.sub;
  }
}
