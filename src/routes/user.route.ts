import { type RouteRecordRaw } from "vue-router";

export type NamedRouteRecordRaw = RouteRecordRaw & {
  name: string;
};

export type ChildrenRouteType =
  | {
      [key: string]: NamedRouteRecordRaw;
    }
  | RouteRecordRaw[];

export type NestedRouteRecordRaw = Omit<RouteRecordRaw, "children"> & {
  children?: ChildrenRouteType;
};

export type AppRoutesType = {
  [key: string]: NestedRouteRecordRaw;
};

export const AppRoutes: AppRoutesType = {
  // Common pages
  common: {
    path: "/",
    component: () => import("@layouts/main.vue"),
    children: {
      Home: {
        path: "",
        name: "home",
        component: () => import("@views/home/index.vue"),
        meta: {
          isAuthRequired: false,
          requiredPermissions: ["some", "permission"],
        },
      },
    },
  },

  // User pages
  User: {
    path: "/users",
    component: () => import("@layouts/main.vue"),
    children: {
      Users: {
        path: "",
        name: "users",
        component: () => import("@views/users/list/index.vue"),
        meta: {
          isAuthRequired: true,
          requiredPermissions: ["some", "permission"],
        },
      },
      User: {
        path: ":id",
        name: "user",
        component: () => import("@views/users/detail/index.vue"),
        meta: {
          isAuthRequired: true,
          requiredPermissions: ["some", "permission"],
        },
      },
      PageNotFound: {
        path: ":catchAll(.*)*",
        name: "page-not-found",
        component: () => import("@views/PageNotFound.vue"),
        meta: {
          isAuthRequired: true,
        },
      },
    },
  },

  Profile: {
    path: "/profile",
    component: () => import("@layouts/main.vue"),
    children: {
      Users: {
        path: "",
        name: "profile",
        component: () => import("@views/profile/index.vue"),
        meta: {
          isAuthRequired: true,
          requiredPermissions: ["some", "permission"],
        },
      },
    },
  },
};
