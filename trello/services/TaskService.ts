import { ITaskHistoryService } from "../characteristic/services/ITaskHistoryService";
import { service, useService } from "@cbto/rest-helper";
import { Task } from "../characteristic/model/Task";
import _ from "lodash";
import { ITrelloApiService } from "../characteristic/services/ITrelloApiSerivce";

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

    if (state === "DONE") {
      return await trelloService.moveTaskToDone(id);
    }

    if (state === "BLOCKED") {
      return await trelloService.moveTaskToReject(id);
    }

    return 0;
  }
}
