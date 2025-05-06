// Js Dependencies
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import {
  AppRoutes,
  type AppRoutesType,
  type NestedRouteRecordRaw,
} from "./user.route";

// Store
// import { useAuthStore } from "@/store";

const flattenedRoutes = (parentRoute: AppRoutesType): Array<RouteRecordRaw> => {
  const processRoute = (route: NestedRouteRecordRaw): RouteRecordRaw => {
    const { children, ...routeWithoutChildren } = route;

    let processedChildren: RouteRecordRaw[] | undefined;

    if (children && typeof children === "object") {
      if (Array.isArray(children)) {
        processedChildren = children.map((child) =>
          processRoute(child as NestedRouteRecordRaw)
        );
      } else {
        processedChildren = Object.values(children).map((child) =>
          processRoute(child as NestedRouteRecordRaw)
        );
      }
    }

    return {
      ...routeWithoutChildren,
      ...(processedChildren && { children: processedChildren }),
    } as RouteRecordRaw;
  };

  return Object.values(parentRoute).map(processRoute);
};

const routes = flattenedRoutes(AppRoutes);
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// const usePermissions = () => {
//   const store = useAuthStore();

//   const can = (permissions: any) => {
//     return store.checkPermissions(permissions);
//   };

//   return {
//     can
//   }
// }

router.beforeEach(async (to, _from, next) => {
  const isLoggedIn = true;

  // Check if route requires authentication
  const isAuthRequired = to.matched.some(
    (record) => record.meta.isAuthRequired
  );

  // Check route-specific permissions
  const requiredPermissions = to.meta.permissions;

  if (!isAuthRequired) {
    return next();
  }

  // Check authentication status
  if (!isLoggedIn) {
    return next({ name: "login" });
  }

  try {
    // Get current user data if not already loaded
    // const store = useAuthStore();
    // if (!store.getUserProfile.userPermissions) {
    //   // Add a check to prevent unnecessary API calls
    //   await store.getContactById("me");
    // }

    // If no specific permissions or admin check required, allow access
    if (!requiredPermissions) {
      return next();
    }

    // Decide navigation based on permissions
    // Statically handling the permission
    const hasPermission = true;
    if (hasPermission) {
      return next();
    }

    // if (usePermissions().can(requiredPermissions)) {
    //   return next();
    // }

    // Redirect to home if permissions are insufficient
    return next({ name: "home" });
  } catch (error) {
    return next({ name: "home" });
  }
});

export default router;
