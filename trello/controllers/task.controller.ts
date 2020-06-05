import { restGet, BaseController, restPost, logDebug, useService } from "@cbto/rest-helper";
import { Task } from "../characteristic/model/Task";
import { ITaskHistoryService } from "../characteristic/services/ITaskHistoryService";

export class TaskController extends BaseController {

    @restGet('/trello/tasks')
    public getAllTask(): Promise<Task> {
        const taskHistoryService = useService<ITaskHistoryService>(ITaskHistoryService);

        return taskHistoryService.getAllTask();
    }

    @restPost('/trello/tasks/:taskId/finish')
    public finishTask(taskId: string, body: any): number {
        return 1;
    }

    @restPost('/trello/tasks/:taskId/reject')
    public rejectTask(taskId: string, body: any): number {
        return 0;
    }
}