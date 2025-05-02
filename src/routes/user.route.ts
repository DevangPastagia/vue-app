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
    component: () => import("@layouts/Main.vue"),
    children: {
      Home: {
        path: "",
        name: "home",
        component: () => import("@views/home/index.vue"),
        meta: {
          isAuthRequired: false,
        },
      },
    },
  },

  // User pages
  User: {
    path: "/users",
    component: () => import("@layouts/Main.vue"),
    children: {
      Users: {
        path: "",
        name: "users",
        component: () => import("@views/users/list/index.vue"),
        meta: {
          isAuthRequired: true,
        },
      },
      User: {
        path: ":id",
        name: "user",
        component: () => import("@views/users/detail/index.vue"),
        meta: {
          isAuthRequired: true,
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
    component: () => import("@layouts/Main.vue"),
    children: {
      Users: {
        path: "",
        name: "profile",
        component: () => import("@views/profile/index.vue"),
        meta: {
          isAuthRequired: true,
        },
      },
    },
  },
};
