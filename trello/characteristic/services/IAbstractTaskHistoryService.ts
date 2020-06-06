import AbstractBaseService from "@cbto/data-helper/dist/lib/mongodb/AbstractBaseService";
import TaskHistory from "../../services/mongo-layer/models/TaskHistory";

export abstract class IAbstractTaskHistoryService extends AbstractBaseService<
  TaskHistory
> {}
