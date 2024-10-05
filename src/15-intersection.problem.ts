interface User {
    id: string;
    firstName: string;
    lastName: string;
}

interface Post {
    id: string;
    title: string;
    body: string;
}

/**
 * How do we type this return statement so it's both
 * User AND { posts: Post[] }
 */
export const getDefaultUserAndPosts = (): User & { posts: Post[] } => {
    return {
        id: '1',
        firstName: 'Uchenna',
        lastName: 'Egbo',
        posts: [
            {
                id: '1',
                title: 'How I learnt Typescript',
                body: "It's pretty damn easy",
            },
        ],
    };
};

const userAndPosts = getDefaultUserAndPosts();

console.log(userAndPosts.posts[0]);
