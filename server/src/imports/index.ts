export { default as connectDB } from "../models/connection";

export { default as AppRoutes } from "../routes";

export {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost
} from "../controllers/posts";

export { default as PostMessage } from "../models/PostMessage";
