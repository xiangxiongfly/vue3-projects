import request from "@/utils/request.js";

// 注册
export const register = ({username, password, repassword}) => request.post("/api/reg", {
    username, password, repassword
});

// 登录
export const login = ({username, password}) => request.post("/api/login", {username, password});

// 获取用户信息
export const getUserInfo = () => request.get("/my/userinfo");

// 修改用户信息
export const updateUserInfo = ({id, nickname, email}) => request.put("/my/userinfo", {id, nickname, email});

// 修改头像
export const updateAvatar = (avatar) => request.patch("/my/update/avatar", {avatar});

// 修改密码
export const updatePwd = ({oldPassword, newPassword, repeatPassword}) =>
    request.patch("/my/updatepwd", {
        old_pwd: oldPassword,
        new_pwd: newPassword,
        re_pwd: repeatPassword,
    });
