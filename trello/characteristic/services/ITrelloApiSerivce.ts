import { IService } from "@cbto/rest-helper";

export abstract class ITrelloApiService extends IService {
  abstract getAllCardOnTODOList(): Promise<any[]>;

  abstract moveTaskToDone(taskId: string): Promise<number>;

  abstract moveTaskToReject(taskId: string): Promise<number>;
}
