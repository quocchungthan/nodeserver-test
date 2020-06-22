import { collectionName, BaseModel } from "@cbto/data-helper";

@collectionName("userLocation")
export default class UserLocation extends BaseModel {
    //@required("name is required")
    public userId: string = "";

    public timestamp: number | undefined;

    public longitude: number | undefined;

    public latitude: number | undefined;

    public tz: number | undefined;


    public assign(obj: any) {
        super.assign(obj);

        if (obj.hasOwnProperty("tz")) {
            this.tz = obj.tz;
        }

        if (obj.hasOwnProperty("userId")) {
            this.userId = obj.userId;
        }

        if (obj.hasOwnProperty("longitude")) {
            this.longitude = obj.longitude;
        }

        if (obj.hasOwnProperty("latitude")) {
            this.latitude = obj.latitude;
        }
    }
}
