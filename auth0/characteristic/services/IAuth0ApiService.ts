import { IUserFromAccessToken } from "../model/IUserFromAccessToken";

export abstract class IAuth0ApiService {
  abstract getUserFromAccessToken(
    accessToken: string
  ): Promise<IUserFromAccessToken>;
}
