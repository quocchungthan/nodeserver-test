import { ITrelloApiService } from "../characteristic/services/ITrelloApiSerivce";
import { service, logDebug, useJsonConfig } from "@cbto/rest-helper";
// @ts-ignore
import { Client as ClientObject } from "node-rest-client";
import _ from "lodash";

@service
export class TrelloApiService extends ITrelloApiService {
  async getAllCardOnTODOList(): Promise<any[]> {
    const headers: any = {
      "Content-Type": "application/json",
    };
    // headers.Authorization = `Bearer ${accessToken}`;
    const args = {
      headers,
    };
    const trelloKey = useJsonConfig("trello.key");
    const trelloToken = useJsonConfig("trello.authToken");

    const databaseBoard = await this.getDATABASEBoard(
      trelloKey,
      trelloToken,
      args
    );

    const listTodo = await this.getListToDoFromOfDatabase(
      databaseBoard.id,
      trelloKey,
      trelloToken,
      args
    );

    return this.getAllCardOfList(listTodo.id, trelloKey, trelloToken, args);
  }

  moveTaskToDone(taskId: string): Promise<number> {
    throw new Error("Method not implemented.");
  }

  moveTaskToReject(taskId: string): Promise<number> {
    throw new Error("Method not implemented.");
  }

  private async getDATABASEBoard(
    trelloKey: string,
    trelloToken: string,
    args: any
  ): Promise<any> {
    const path = `https://api.trello.com/1/members/me/boards?key=${trelloKey}&token=${trelloToken}`;

    const data = await this.clientPromise(path, args);

    return _.find(data as any[], (i) =>
      (i.name as string).startsWith(useJsonConfig("trello.names.database"))
    );
  }

  private async getListToDoFromOfDatabase(
    boardId: string,
    trelloKey: string,
    trelloToken: string,
    args: any
  ) {
    const path = `https://api.trello.com/1/boards/${boardId}/lists?key=${trelloKey}&token=${trelloToken}`;

    const data = await this.clientPromise(path, args);

    return _.find(data as any[], (i) =>
      (i.name as string).startsWith(useJsonConfig("trello.names.todo"))
    );
  }

  private getAllCardOfList(
    listId: string,
    trelloKey: string,
    trelloToken: string,
    args: any
  ) {
    const path = `https://api.trello.com/1/lists/${listId}/cards?key=${trelloKey}&token=${trelloToken}`;

    return this.clientPromise(path, args);
  }

  private async clientPromise(path: string, args: any): Promise<any> {
    const client = new ClientObject();

    return new Promise<any>((resolve, reject) => {
      client.get(
        path,
        args,
        async (data: string | any[] | PromiseLike<any[]> | undefined) => {
          if (Buffer.isBuffer(data)) {
            data = data.toString("utf8");
            reject(data);
          } else if (data?.hasOwnProperty("error")) {
            reject(data);
          } else {
            resolve(data);
          }
        }
      );
    });
  }
}
