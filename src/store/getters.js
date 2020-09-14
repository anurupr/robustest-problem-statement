import * as utils from '@/utils'

export default {
    getCurrentUser: () => {
        // this should use the auth handler to get the correct user
        // since it is a static app, we are using a static object
        return {
            id: 1,
            username: 'rtester',
            name: 'Robus Tester',
            email: 'robustester@gmail.com',
            location: 'Bangalore, India',
            gravatar: utils.cgravatar('robustester@gmail.com')
        };
    },
    getLatestPostId: (state) => {
        return (Math.max.apply(Math, state.posts.map(function(o) { return o.id; }))) + 1;
    }
}