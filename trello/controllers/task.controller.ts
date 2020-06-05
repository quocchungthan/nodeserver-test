import { restGet, BaseController } from "@cbto/rest-helper";

export class TaskController extends BaseController {

    @restGet('/randomNumber')
    public randomNumber() {
        return {
            result: Math.round(Math.random() * 10),
        }
    }
}