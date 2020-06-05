import { restGet, BaseController, restPost, logDebug } from "@cbto/rest-helper";

export class TaskController extends BaseController {

    @restGet('/trello/tasks')
    public getAllTask() {
        return {
            result: Math.round(Math.random() * 10),
        }
    }

    @restPost('/trello/tasks/:taskId/finish')
    public finishTask(taskId: string, body: any): number {
        logDebug(`Finishing task ${taskId}`);
        logDebug(`Body: ${JSON.stringify(body)}`);

        return 1;
    }

    @restPost('/trello/tasks/:taskId/reject')
    public rejectTask(taskId: string, body: any): number {

        logDebug(`Rejecting task ${taskId}`);
        logDebug(`Body: ${JSON.stringify(body)}`);

        return 0;
    }
}