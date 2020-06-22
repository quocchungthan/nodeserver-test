import AbstractBaseService from "@cbto/data-helper/dist/lib/mongodb/AbstractBaseService";
import UserLocation from "../model/mongodb/UserLocation";

export abstract class IAbstractUserLocationRepository extends AbstractBaseService<
    UserLocation
    > { }
