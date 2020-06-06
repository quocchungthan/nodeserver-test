import { ITrelloApiService } from "../characteristic/services/ITrelloApiSerivce";
import { service, logDebug, useJsonConfig, logError } from "@cbto/rest-helper";
// @ts-ignore
import { Client as ClientObject } from "node-rest-client";
import _ from "lodash";

@service
export class TrelloApiService extends ITrelloApiService {
  args: { headers: any } | undefined;
  trelloKey: string | undefined;
  trelloToken: string | undefined;

  async getAllCardOnTODOList(): Promise<any[]> {
    this.setTrelloConfig();
    const databaseBoard = await this.getDATABASEBoard();

    console.log(databaseBoard.id);

    const listTodo = await this.getListToDoFromOfDatabase(databaseBoard.id);

    console.log(listTodo.id);

    return this.getAllCardOfList(listTodo.id);
  }

  async moveTaskToDone(taskId: string): Promise<number> {
    this.setTrelloConfig();
    try {
      const databaseBoard = await this.getDATABASEBoard();
      const list = await this.getListDoneFromOfDatabase(databaseBoard.id);

      await this.updateListOfCard(taskId, list.id);

      return 1;
    } catch (err) {
      logDebug(JSON.stringify(err));
      return 0;
    }
  }

  async moveTaskToReject(taskId: string): Promise<number> {
    this.setTrelloConfig();
    try {
      const databaseBoard = await this.getDATABASEBoard();
      const list = await this.getListBlockedFromOfDatabase(databaseBoard.id);

      await this.updateListOfCard(taskId, list.id);

      return 1;
    } catch (err) {
      logDebug(JSON.stringify(err));
      return 0;
    }
  }

  private async getDATABASEBoard(): Promise<any> {
    const path = `https://api.trello.com/1/members/me/boards?key=${this.trelloKey}&token=${this.trelloToken}`;

    const data = await this.clientPromise(path, this.args);

    return _.find(data as any[], (i) =>
      (i.name as string).startsWith(useJsonConfig("trello.names.database"))
    );
  }

  private async getListToDoFromOfDatabase(boardId: string) {
    const path = `https://api.trello.com/1/boards/${boardId}/lists?key=${this.trelloKey}&token=${this.trelloToken}`;

    const data = await this.clientPromise(path, this.args);

    return _.find(data as any[], (i) =>
      (i.name as string).startsWith(useJsonConfig("trello.names.todo"))
    );
  }

  private async getListDoneFromOfDatabase(boardId: string) {
    const path = `https://api.trello.com/1/boards/${boardId}/lists?key=${this.trelloKey}&token=${this.trelloToken}`;

    const data = await this.clientPromise(path, this.args);

    return _.find(data as any[], (i) =>
      (i.name as string).startsWith(useJsonConfig("trello.names.done"))
    );
  }

  private async getListBlockedFromOfDatabase(boardId: string) {
    const path = `https://api.trello.com/1/boards/${boardId}/lists?key=${this.trelloKey}&token=${this.trelloToken}`;

    const data = await this.clientPromise(path, this.args);

    return _.find(data as any[], (i) =>
      (i.name as string).startsWith(useJsonConfig("trello.names.blocked"))
    );
  }

  private getAllCardOfList(listId: string) {
    const path = `https://api.trello.com/1/lists/${listId}?key=${this.trelloKey}&token=${this.trelloToken}`;

    return this.clientPromise(path, this.args);
  }

  private updateListOfCard(cardId: string, idList: string) {
    const path = `https://api.trello.com/1/cards/${cardId}?key=${this.trelloKey}&token=${this.trelloToken}`;

    return this.clientPutPromise(path, this.args, { idList });
  }

  private clientPutPromise(
    path: string,
    args: any,
    data: object
  ): Promise<any> {
    const client = new ClientObject();

    return new Promise<any>((resolve, reject) => {
      client.put(
        path,
        { ...args, data },
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

  private setTrelloConfig() {
    const headers: any = {
      "Content-Type": "application/json",
    };
    // headers.Authorization = `Bearer ${accessToken}`;
    this.args = {
      headers,
    };
    this.trelloKey = useJsonConfig("trello.key");
    this.trelloToken = useJsonConfig("trello.authToken");
  }
}
