import { ITaskHistoryService } from "../characteristic/services/ITaskHistoryService";
import { service } from "@cbto/rest-helper";
import { Task } from '../characteristic/model/Task';

@service
export class TaskService extends ITaskHistoryService {
    getAllTask(): Promise<Task> {
        throw new Error("Method not implemented.");
    }
    getUpdateTaskState(id: string, state: "BLOCKED" | "DONE", reasonIds: string[]): Promise<number> {
        throw new Error("Method not implemented.");
    }

}