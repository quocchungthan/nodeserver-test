import { IUserFromAccessToken } from "./IUserFromAccessToken";

export interface IIncludingUserInfo {
    __userInfo: IUserFromAccessToken;
}