import {
  ADD_ROLE_ADMIN_API,
  DELETE_ROLE_ADMIN_API,
  UPDATE_ROLE_ADMIN_API,
} from "../Common/API/AdminAPI";
import * as URL from "../Common/API/Authority";
import { commonService } from "./commonService";
import instance from "./TokenService";

export class AuthorityService extends commonService {
  constructor() {
    super();
  }

  findAll = () => {
    return instance.get(URL.GET_ALL_AUTHORITIES_URL);
  };

  save = (data) => {
    return instance.post(URL.GET_ALL_AUTHORITIES_URL, data);
  };

  delete = (authorities) => {
    return instance.delete(
      `${URL.GET_ALL_AUTHORITIES_URL}/${authorities.mapq}/${authorities.taikhoan.tendn}`,
      authorities
    );
  };

  addRole = (role) => {
    return instance.post(ADD_ROLE_ADMIN_API, role);
  };

  updateRole = (role) => {
    return instance.put(UPDATE_ROLE_ADMIN_API, role);
  };

  deleteRole = (role) => {
    return instance.delete(`${DELETE_ROLE_ADMIN_API}/${role.mavt}`);
  };
}
export const authorityService = new AuthorityService();
