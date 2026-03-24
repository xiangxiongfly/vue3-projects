import request from "@/utils/request.js";

// 获取分类
export const getChannels = () => request.get("/my/cate/list");
// 添加分类
export const addChannel = (data) => request.post("/my/cate/add", data);
// 编辑分类
export const editChannel = (data) => request.put(`/my/cate/info`, data);
// 删除分类
export const deleteChannel = (id) => request.delete(`/my/cate/del`, {params: {id}});

// 获取文章列表
export const getArticles = (params) => request.get("/my/article/list", {params});
// 添加文章
export const addArticle = (data) => request.post("/my/article/add", data);
// 获取文章详情
export const getArticleDetails = (id) => request.get(`/my/article/info`, {params: {id}});
// 编辑文章
export const editArticle = (data) => request.put(`/my/article/info`, data);
// 删除文章
export const deleteArticle = (id) => request.delete(`/my/article/info`, {params: {id}});