import AbstractBaseService from "@cbto/data-helper/dist/lib/mongodb/AbstractBaseService";
import TaskHistory from "../model/mongodb/TaskHistory";

export abstract class IAbstractTaskHistoryService extends AbstractBaseService<
  TaskHistory
> {}
