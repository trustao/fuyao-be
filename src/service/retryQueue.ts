import {RetryQueue} from "../models/RetryQueue";


class RetryQueueManage {



  syncDb() {
    RetryQueue.findAll()
  }


}
