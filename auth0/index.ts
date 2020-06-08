import "./services";
import { Auth0Middleware } from "./controllers/Auth0Middleware";
import { module, BaseModule } from "@cbto/rest-helper";

@module("auth0")
export class Auth0Module extends BaseModule {

    getAllMiddlewares() {
        return this.getMiddlewaresOfControllers([Auth0Middleware]);
    }
}
