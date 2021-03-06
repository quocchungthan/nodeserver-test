import { IUserFromAccessToken } from "../model/IUserFromAccessToken";

export abstract class IAuth0Service {
  abstract isAuthenticated(accessToken: string): Promise<IUserFromAccessToken>;
}
