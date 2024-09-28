export const createBlog = async (req: any) => {
    const res = await req
        .post('/blogs')
        .auth('admin', 'qwerty')
        .send({
            name: 'blog1',
            description: 'description1',
            websiteUrl: 'https://some.com',
            createdAt: '2024-07-24T11:33:45.533Z',
            isMembership: false
        })
        .expect(201)

    return res.body
}