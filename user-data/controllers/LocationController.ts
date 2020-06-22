import { BaseController, restPost } from "@cbto/rest-helper";
import { IStoreLocationBody } from "../characteristic/model/IStoreLocationBody";

export class LocationController extends BaseController {
    @restPost('/userdata/location')
    public async storeLocationOfUser(body: IStoreLocationBody): Promise<number> {

        return 0;
    }
}