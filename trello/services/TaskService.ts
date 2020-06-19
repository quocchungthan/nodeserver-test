import { service, useService } from "@cbto/rest-helper";
import { ITaskService } from "../characteristic/services/ITaskService";
import { SubmissionItem } from "../characteristic/model/SubmissionItem";
import { ITrelloApiService } from "../characteristic/services/ITrelloApiSerivce";

@service
export class TaskService extends ITaskService {
    async getRejectionReasons(): Promise<SubmissionItem[]> {
        const trelloService = useService<ITrelloApiService>(ITrelloApiService);
        const list = await trelloService.getAllCardOnReasonsList();

        return list.map((item) => {
            const x = new SubmissionItem();

            item._id = item.id;
            item.label = item.name;

            x.assign(item);

            return x;
        });
    }

    async getConclusions(): Promise<SubmissionItem[]> {
        const trelloService = useService<ITrelloApiService>(ITrelloApiService);
        const list = await trelloService.getAllCardOnConclusionsList();

        return list.map((item) => {
            const x = new SubmissionItem();

            item._id = item.id;
            item.label = item.name;

            x.assign(item);

            return x;
        });
    }

}
