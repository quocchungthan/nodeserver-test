import { IService } from "@cbto/rest-helper";
import UserLocation from "../model/mongodb/UserLocation";
import { IStoreLocationBody } from "../model/IStoreLocationBody";

export abstract class ILocationService extends IService {

    abstract saveLocation(userId: string, data: IStoreLocationBody): Promise<number>;
}
