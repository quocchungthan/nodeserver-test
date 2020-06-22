import { service } from "@cbto/rest-helper";
import { IAbstractUserLocationRepository } from "../../characteristic/services/IAbstractUserLocationRepository";
import UserLocation from "../../characteristic/model/mongodb/UserLocation";
import { MongoService } from "@cbto/data-helper";
import _ from "lodash";

@service
export class UserLocationRepository extends IAbstractUserLocationRepository {
    public dataService: MongoService<UserLocation>;

    constructor() {
        super();
        this.dataService = new MongoService<UserLocation>(
            this.getInstancePrototypeName()
        );
    }
    public getInstancePrototypeName(): string {
        return _.get(UserLocation.prototype, "_collectionName");
    }
    public newInstance(): UserLocation {
        return new UserLocation();
    }
}
