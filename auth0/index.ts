import "./services";
import "./controllers/Auth0Middleware";
import { module, BaseModule } from "@cbto/rest-helper";

@module("auth0")
export class Auth0Module extends BaseModule {}
