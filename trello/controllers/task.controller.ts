import {
  restGet,
  BaseController,
  restPost,
  logDebug,
  useService,
} from "@cbto/rest-helper";
import { Task } from "../characteristic/model/Task";
import { ITaskHistoryService } from "../characteristic/services/ITaskHistoryService";
import { ITaskService } from "../characteristic/services/ITaskService";
import { SubmissionItem } from "../characteristic/model/SubmissionItem";

export class TaskController extends BaseController {
  @restGet("/trello/tasks")
  public getAllTask(): Promise<Task[]> {
    const taskHistoryService = useService<ITaskHistoryService>(
      ITaskHistoryService
    );

    return taskHistoryService.getAllTask();
  }

  @restPost("/trello/tasks/:taskId/finish")
  public finishTask(taskId: string, body: any): Promise<number> {
    return useService<ITaskHistoryService>(ITaskHistoryService).updateTaskState(
      taskId,
      "DONE",
      body.reasons
    );
  }

  @restGet("/trello/reasons")
  public getRejectionReasons(): Promise<SubmissionItem[]> {
    return useService<ITaskService>(ITaskService).getRejectionReasons();
  }

  @restGet("/trello/conclusions")
  public getConclusions(taskId: string, body: any): Promise<SubmissionItem[]> {
    return useService<ITaskService>(ITaskService).getConclusions();
  }

  @restPost("/trello/tasks/:taskId/reject")
  public rejectTask(taskId: string, body: any): Promise<number> {
    return useService<ITaskHistoryService>(ITaskHistoryService).updateTaskState(
      taskId,
      "BLOCKED",
      body.reasons
    );
  }
}
