import { BaseModel } from "@cbto/data-helper";

export class SubmissionItem extends BaseModel {
    public label: string = "";

    public assign(obj: any) {
        super.assign(obj);

        if (obj.hasOwnProperty("label")) {
            this.label = obj.label;
        }
    }
}
