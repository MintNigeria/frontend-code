export interface IChangeRolePassword {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ICreateInstitutionUser {
  institutionId: number;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  address: string;
  department: string;
  staffIdNumber: string;
  roleId: string;
  title: string;
  faculty: string;
  state: string;
  localGovernment: string
}

export interface IUpdateGlobalAdminUser {
  oldRoleId: 0;
  newRoleId: 0;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  staffIdNumber: string;
  userId: 0;
  department: string;
  stateOfResidence: string;
  localGovernment: string;
  address: string;
  isEnabled: boolean;
}

export interface IGetRolePermission {
  roleName: string;
  permissions: [
    {
      id: 0;
      name: string;
      description: string;
    }
  ];
}

export interface IGlobalAdminUsersAndRoles {
  userId: 0;
  roleId: 0;
  name: string;
  roleName: string;
  emailAddress: string;
  phoneNumber: string;
}

interface IGetAdminUsersInRole {
  userId: 0;
  roleId: 0;
  name: string;
  profileImagePath: string;
  email: string;
}

export interface IRolesAndPermissions {

      id: number,
      name:string,
      usersCount: number
  }

  export interface ICreateAdminRole {
    name: string,
    permissionIds: [ ]
  }


export interface UsersAndRolesStateInterface {
  usersAndRoles: { defaultRoles: Array<IRolesAndPermissions>, customRoles : Array<IRolesAndPermissions> };
  message?: string | null;
  createGlobalAdminSuccessMessage: string;
  globalUsersAndRoles: {data: Array<any>; totalCount: number},
  updateGlobalAdminSuccessMessage: string;
  globalUser: any;
  createAdminRole: ICreateAdminRole | null;
  rolesAndPermission: { data: Array<IRolesAndPermissions>; totalCount: number} | any,
  getUsersInRole: { data: Array<any>; totalCount: number} | null
  getRolePermission: any;
  getStates: any;
  getLGA: any;
  getStateAndLGA: any;
  institutionRole: any;
  newInstitutionuser: ICreateInstitutionUser | null;
}
