import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
	const { html, frontmatter } = data.markdownRemark;
	const { title, date } = frontmatter;
	console.log(frontmatter);
	return (
		<Layout>
			<SEO title="Home" />
			<h1>{title}</h1>
			<p>{date}</p>
			<div dangerouslySetInnerHTML={{ __html: html }} />
			<Link to="/">Go to home</Link>
		</Layout>
	)
}

export const pageQuery = graphql`
	query PostPage($path: String!) {
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			id
			frontmatter {
				path
				title
				date(formatString: "DD/MM")
			}
			html
		}
	}
`;

export default IndexPage
