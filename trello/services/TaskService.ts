import { ITaskHistoryService } from "../characteristic/services/ITaskHistoryService";
import { service, useService } from "@cbto/rest-helper";
import { Task } from "../characteristic/model/Task";
import _ from "lodash";
import { ITrelloApiService } from "../characteristic/services/ITrelloApiSerivce";
import { IAbstractTaskHistoryService } from "../characteristic/services/IAbstractTaskHistoryService";
import TaskHistory from "./mongo-layer/models/TaskHistory";

@service
export class TaskService extends ITaskHistoryService {
  getAllTask(): Promise<Task[]> {
    const trelloService = useService<ITrelloApiService>(ITrelloApiService);

    return trelloService.getAllCardOnTODOList();
  }

  async updateTaskState(
    id: string,
    state: "BLOCKED" | "DONE",
    reasonIds: string[]
  ): Promise<number> {
    const trelloService = useService<ITrelloApiService>(ITrelloApiService);
    const taskHistory = useService<IAbstractTaskHistoryService>(
      IAbstractTaskHistoryService
    );
    const data = new TaskHistory();

    data.taskId = id;
    data.newState = state;
    data.reasonIds = reasonIds;

    if (state === "DONE") {
      await taskHistory.store(data);
      return await trelloService.moveTaskToDone(id);
    }

    if (state === "BLOCKED") {
      await taskHistory.store(data);
      return await trelloService.moveTaskToReject(id);
    }

    return 0;
  }
}
