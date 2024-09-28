import { createString } from "./helpers/test-helpers"

export const testSeeder = {
    createBlogDTO() {
        return {
            name: 'blog1',
            description: 'description1',
            websiteUrl: 'https://some.com',
        }
    },

    createIncorrectBlogDTO() {
        return {
            name: 'blog name max length15',
            description: 'description',
            websiteUrl: 'https://some.com'
        }
    },

    updateBlogDTO() {
        return {
            name: 'blog updated',
            description: 'description updated',
            websiteUrl: 'https://some-updated.com',
        }
    },

    createPostDTO(blogId: string) {
        return {
            title: 'post1',
            shortDescription: 'description1',
            content: 'posts content lorem lipsum asdbsdfkj',
            blogId: blogId,
            createdAt: new Date().toISOString()
        }
    },

    createIncorrectPostDTO(blogId: string) {
        return {
            title: 'post1',
            shortDescription: createString(101),
            content: 'posts content lorem lipsum asdbsdfkj',
            blogId: blogId,
            createdAt: new Date().toISOString()
        }
    },

    updatePostDTO(blogId: string) {
        return {
            title: 'post updated',
            shortDescription: 'description updated',
            content: 'posts content updated lorem lipsum asdbsdfkj',
            blogId: blogId
        }
    },

    createUserDTO() {
        return {
            login: 'login01',
            password: 'qwerty01',
            email: 'user@email.com',
        }
    },

    createIncorrectUserDTO() {
        return {
            login: createString(11),
            password: 'qwerty01',
            email: 'user@email.com',
        }
    },
}