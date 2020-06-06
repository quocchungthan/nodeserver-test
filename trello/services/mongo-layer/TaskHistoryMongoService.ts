import TaskHistory from "../../characteristic/model/mongodb/TaskHistory";
import { MongoService } from "@cbto/data-helper/dist/lib/mongodb/MongoService";
import { IAbstractTaskHistoryService } from "../../characteristic/services/IAbstractTaskHistoryService";
import { service } from "@cbto/rest-helper";

@service
export class TaskHistoryMongoService extends IAbstractTaskHistoryService {
  public dataService: MongoService<TaskHistory>;

  constructor() {
    super();
    this.dataService = new MongoService<TaskHistory>(
      this.getInstancePrototypeName()
    );
  }
  public getInstancePrototypeName(): string {
    return TaskHistory._collectionName;
  }
  public newInstance(): TaskHistory {
    return new TaskHistory();
  }
}
