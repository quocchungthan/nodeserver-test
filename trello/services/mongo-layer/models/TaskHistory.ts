import { collectionName, BaseModel } from "@cbto/data-helper";

@collectionName("taskHistory")
export default class TaskHistory extends BaseModel {
  //@required("name is required")
  public taskId: string = "";

  public newState: "BLOCKED" | "DONE" | undefined;

  public reasonIds: string[] = [];

  public assign(obj: any) {
    super.assign(obj);

    if (obj.hasOwnProperty("taskId")) {
      this.taskId = obj.taskId;
    }

    if (obj.hasOwnProperty("newState")) {
      this.newState = obj.newState;
    }

    if (obj.hasOwnProperty("reasonIds")) {
      this.reasonIds = [...obj.reasonIds];
    }
  }
}
