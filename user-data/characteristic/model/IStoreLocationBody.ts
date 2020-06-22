import { IIncludingUserInfo } from "../../../auth0/characteristic/model/IIncludingUserInfo";

export interface IStoreLocationBody extends IIncludingUserInfo {
    longitude: number;
    latitude: number;
    timestamp: number;
}