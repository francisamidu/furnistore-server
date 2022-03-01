import { SessionRequest } from "../../interfaces";
import { Role } from "../../db/models";

const getRole = async ({ roleId }: any, req: SessionRequest) => {};
const getRoles = async (context: any, req: SessionRequest) => {};
const assignPermissionToUserRole = async (
  { permissionId }: any,
  req: SessionRequest
) => {};

export { assignPermissionToUserRole, getRole, getRoles };
