import * as entities from "./src/models"

module.exports = {
  entities: Object.values(entities),
  schema: "public",
  clientUrl: "postgres://postgres@localhost/medusa-user",
  type: "postgresql",
}
