const adminPermissions = [
  {
    action: "CREATE_PRODUCT",
    code: 1,
  },
  {
    action: "DELETE_PRODUCT",
    code: 2,
  },
  {
    action: "UPDATE_PRODUCT",
    code: 3,
  },
  {
    action: "CREATE_CATEGORIES",
    code: 4,
  },
  {
    action: "DELETE_CATEGORIES",
    code: 5,
  },
  {
    action: "UPDATE_CATEGORIES",
    code: 6,
  },
  {
    action: "CREATE_USERS",
    code: 7,
  },
  {
    action: "DELETE_USERS",
    code: 8,
  },
  {
    action: "UPDATE_USERS",
    code: 9,
  },
];

const userPermissions = [
  {
    action: "READ_PRODUCTS",
    code: 10,
  },
  {
    action: "READ_CATEGORIES",
    code: 11,
  },
  {
    action: "READ_ORDERS",
    code: 12,
  },
  {
    action: "READ_SALES",
    code: 13,
  },
  {
    action: "READ_USERS",
    code: 14,
  },
];

export { adminPermissions, userPermissions };
