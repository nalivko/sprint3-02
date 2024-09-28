export const createUser = async (req: any) => {
    const res = await req
        .post('/users')
        .auth('admin', 'qwerty')
        .send({
            login: "login02",
            password: "qwerty02",
            email: "example@example.com"
        })
        .expect(201)

    return res.body
}