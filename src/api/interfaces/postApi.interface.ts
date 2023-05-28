import {
  CreatePostDto,
  DeletePostResponse,
  QueryPostDto,
  UpdatePostDto,
  UpdatePostResponse,
} from "../dtos/post.dto";

export interface PostApi {
  getUserPosts: ({ uid, skip }: GetUserPostsParams) => Promise<QueryPostDto[]>;
  createPost: ({
    userGroup,
    author,
    content,
  }: CreatePostDto) => Promise<QueryPostDto>;
  updatePost: ({
    id,
    author,
    content,
  }: UpdatePostDto) => Promise<UpdatePostResponse>;
  deletePost: (pid: number) => Promise<DeletePostResponse>;
}

export type GetUserPostsParams = {
  uid: number;
  skip?: number;
};