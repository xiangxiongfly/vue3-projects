import useLoginStore from "@/stores/loginStore.js";

/**
 * 判断用户是否有该权限
 */
export default function usePermissions(permissionId) {
    const loginStore = useLoginStore();
    const allPermissions = loginStore.userPermissions;
    return !!allPermissions.find((item) => item.includes(permissionId));
}