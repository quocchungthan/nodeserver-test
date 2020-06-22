import { BaseController, restPost, useService } from "@cbto/rest-helper";
import { IStoreLocationBody } from "../characteristic/model/IStoreLocationBody";
import { ILocationService } from "../characteristic/services/ILocationService";

export class LocationController extends BaseController {
    @restPost('/userdata/location')
    public async storeLocationOfUser(body: IStoreLocationBody, user: any): Promise<number> {
        const locationService = useService<ILocationService>(ILocationService);

        return locationService.saveLocation(body?.__userInfo?.sub, body);
    }
}