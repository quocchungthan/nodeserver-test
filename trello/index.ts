import { TaskController } from "./controllers/task.controller";
import { module, BaseModule } from "@cbto/rest-helper";

@module("trello")
export class TrelloModule extends BaseModule {
    protected getAllEndpoints() {
        // register controllers to module here
        const controllers = [TaskController];

        return this.getEndpointsOfControllers(controllers);
    }
}
