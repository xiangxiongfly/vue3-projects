/**
 * 根据用户菜单获取所有权限
 */
export function menusToPermissions(userMenus) {
    const permissions = [];

    function mapPermissions(menus) {
        for (const item of menus) {
            if (item.type === 3) {
                permissions.push(item.permission);
            } else {
                mapPermissions(item.children ?? []);
            }
        }
    }

    mapPermissions(userMenus);
    return permissions;
}

export let firstRoute = null;

/**
 * 根据用户菜单动态添加路由
 */
export function menusToRoutes(userMenus) {
    const localRouters = loadLocalRoutes();
    const routes = [];
    for (const menu of userMenus) {
        let firstSubRoute = null;
        for (const submenu of menu.children) {
            // 通过url进行配对
            const route = localRouters.find((item) => item.path === submenu.url);
            if (route) {
                routes.push(route);
                if (!firstSubRoute) {
                    firstSubRoute = route;
                }
                if (!firstRoute) {
                    firstRoute = route;
                }
            }
        }
        if (firstSubRoute) {
            routes.push({path: menu.url, redirect: firstSubRoute.path});
        }
    }
    return routes;
}

/**
 * 加载所有本地的路由文件，并转为路由对象
 */
function loadLocalRoutes() {
    const routes = [];
    const files = import.meta.glob(
        "@/router/main/**/*.js",
        {
            eager: true
        });
    console.log("路由文件files:", files);
    for (const key in files) {
        const module = files[key];
        routes.push(module.default);
    }
    return routes;
}

/**
 * 将path转换为menu
 */
export function pathToMenu(path, menus) {
    for (const menu of menus) {
        for (const submenu of menu.children) {
            if (submenu.url === path) {
                return submenu;
            }
        }
    }
}

/**
 * 将path转换为导航
 */
export function pathToBreadcrumb(path, menus) {
    const breadcrumbs = [];
    for (const menu of menus) {
        for (const submenu of menu.children) {
            if (submenu.url === path) {
                breadcrumbs.push({name: menu.name, path: menu.url});
                breadcrumbs.push({name: submenu.name, path: submenu.url});
            }
        }
    }
    return breadcrumbs;
}

/**
 *
 * @param menus
 * @returns {*[]}
 */
export function menusToIds(menus) {
    const ids = [];

    function getId(menus) {
        for (const item of menus) {
            if (item.children) {
                getId(item.children);
            } else {
                ids.push(item.id);
            }
        }
    }

    getId(menus);
    console.log("ids",ids);
    return ids;
}