import { IService } from "@cbto/rest-helper";
import { SubmissionItem } from "../model/SubmissionItem";

export abstract class ITaskService extends IService {
    abstract getRejectionReasons(): Promise<SubmissionItem[]>;

    abstract getConclusions(): Promise<SubmissionItem[]>;
}
