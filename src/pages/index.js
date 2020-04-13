import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
	const { allMarkdownRemark } = data;
	const { edges } = allMarkdownRemark

	return (
		<Layout>
			<SEO title="Home" />

			<div>
				{edges.map(item => {
					const { node } = item;
					const { frontmatter } = node;

					return (
						<Link to={frontmatter.path} key={frontmatter.path}>
							<h2>{frontmatter.title}</h2>
						</Link>
					);
				})}
			</div>
		</Layout>
	)
}

export const pageQuery = graphql`
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
`;

export default IndexPage
