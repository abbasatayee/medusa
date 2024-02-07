import middlewares, {
  transformBody,
  transformQuery,
} from "../../../middlewares"

import { Router } from "express"
import {
  allowedAdminWorkflowExecutionsRelations,
  defaultAdminWorkflowExecutionDetailFields,
  defaultAdminWorkflowExecutionsFields,
  defaultAdminWorkflowExecutionsRelations,
} from "./query-config"
import {
  AdminGetWorkflowExecutionDetailsParams,
  AdminGetWorkflowExecutionsParams,
  AdminPostWorkflowsAsyncResponseReq,
  AdminPostWorkflowsRunReq,
} from "./validators"

const route = Router()

const retrieveTransformQueryConfig = {
  defaultFields: defaultAdminWorkflowExecutionDetailFields,
  defaultRelations: defaultAdminWorkflowExecutionsRelations,
  allowedRelations: allowedAdminWorkflowExecutionsRelations,
  isList: false,
}

const listTransformQueryConfig = {
  ...retrieveTransformQueryConfig,
  defaultFields: defaultAdminWorkflowExecutionsFields,
  isList: true,
}

export default (app) => {
  app.use("/workflows", route)

  route.get(
    "/execution",
    transformQuery(AdminGetWorkflowExecutionsParams, listTransformQueryConfig),
    middlewares.wrap(require("./list-execution").default)
  )

  route.get(
    "/:id/:transaction_id",
    transformQuery(
      AdminGetWorkflowExecutionDetailsParams,
      retrieveTransformQueryConfig
    ),
    middlewares.wrap(require("./get-execution").default)
  )

  route.post(
    "/:id/run",
    transformBody(AdminPostWorkflowsRunReq),
    middlewares.wrap(require("./run-workflow").default)
  )

  route.post(
    "/:id/:transaction_id/:step_id/success",
    transformBody(AdminPostWorkflowsAsyncResponseReq),
    middlewares.wrap(require("./set-step-success").default)
  )

  route.post(
    "/:id/:transaction_id/:step_id/failure",
    transformBody(AdminPostWorkflowsAsyncResponseReq),
    middlewares.wrap(require("./set-step-failure").default)
  )

  return app
}

export * from "./query-config"