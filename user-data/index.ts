import { IModule, module, BaseModule, BaseController } from "@cbto/rest-helper";
import { LocationController } from "./controllers/LocationController";

@module("userData")
export class UserDataModule extends BaseModule {
    protected getAllEndpoints() {
        // register controllers to module here
        const controllers: BaseController[] = [LocationController];

        return this.getEndpointsOfControllers(controllers);
    }

}