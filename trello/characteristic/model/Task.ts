import { BaseModel } from "@cbto/data-helper";

export class Task extends BaseModel {
  public name: string = "";
  public description: string | undefined;

  public assign(obj: any) {
    super.assign(obj);

    if (obj.hasOwnProperty("name")) {
      this.name = obj.name;
    }

    if (obj.hasOwnProperty("description")) {
      this.description = obj.description;
    }
  }
}
