import { ITrelloApiService } from "../characteristic/services/ITrelloApiSerivce";
import { service } from "@cbto/rest-helper";

@service
export class TrelloApiService extends ITrelloApiService {
  getAllCardOnTODOList(): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
  moveTaskToDone(taskId: string): Promise<number> {
    throw new Error("Method not implemented.");
  }
  moveTaskToReject(taskId: string): Promise<number> {
    throw new Error("Method not implemented.");
  }
}
