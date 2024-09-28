import { createBlog } from "./createBlogs";

export const createPost = async (req: any) => {
    const createdBlog = await createBlog(req)

    const res = await req
        .post('/posts')
        .auth('admin', 'qwerty')
        .send({
            title: 'post1',
            shortDescription: 'description1',
            content: 'posts content lorem lipsum asdbsdfkj',
            blogId: createdBlog.id,
            createdAt: new Date().toISOString()
        })
        .expect(201)

    return res.body
}