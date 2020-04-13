const path = require('path');

/*
    Método da api do gatsby
    https://www.gatsbyjs.org/docs/node-apis/#createPages
*/
exports.createPages = ({ graphql, actions}) => {
    const { createPage } = actions;
    const postTemplate = path.resolve('src/templates/post.js');

    return graphql(
        `
            {
                allMarkdownRemark {
                    edges {
                        node {
                            html
                            frontmatter {
                                path
                                title
                                date(formatString: "DD/MM/YYYY")
                            }
                        }
                    }
                }
            }
        `
    ).then(result => {
        if (result.errors) {
            Promise.reject(result.errors);
        }

        const posts = result.data.allMarkdownRemark.edges;

        posts.forEach(({ node }) => {
            const { frontmatter } = node;

            createPage({
                path: frontmatter.path,
                component: postTemplate,
                context: {
                    path: frontmatter.path
                }
            });
        });
    });
}