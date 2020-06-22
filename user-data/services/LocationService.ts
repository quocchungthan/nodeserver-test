import { service, useService } from "@cbto/rest-helper";
import { ILocationService } from "../characteristic/services/ILocationService";
import { IStoreLocationBody } from "../characteristic/model/IStoreLocationBody";
import { IAbstractUserLocationRepository } from "../characteristic/services/IAbstractUserLocationRepository";
import UserLocation from "../characteristic/model/mongodb/UserLocation";

@service
export class LocationService extends ILocationService {
    async saveLocation(userId: string, data: IStoreLocationBody): Promise<number> {
        const userLocation = useService<IAbstractUserLocationRepository>(IAbstractUserLocationRepository);
        const dataSave = new UserLocation();

        dataSave.userId = userId;
        dataSave.longitude = data.longitude;
        dataSave.timestamp = data.latitude;
        dataSave.latitude = data.timestamp;

        return (await userLocation.store(dataSave)) ? 1 : 0;
    }

}