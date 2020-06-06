import { IService } from "@cbto/rest-helper";
import { Task } from "../model/Task";

export abstract class ITaskHistoryService extends IService {
  abstract getAllTask(): Promise<Task[]>;

  abstract updateTaskState(
    id: string,
    state: "BLOCKED" | "DONE",
    reasonIds: string[]
  ): Promise<number>;
}
