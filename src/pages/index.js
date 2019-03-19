import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogNode extends React.Component {

	render() {
		let node = this.props.node
		const title = node.frontmatter.title || node.fields.slug
		return <div key={node.fields.slug}>
			<h3
				style={{
					marginBottom: rhythm(1 / 4),
				}}
			>
				<Link style={{ boxShadow: `none` }} to={node.fields.slug}>
					{title}
				</Link>
			</h3>
			<small>{node.frontmatter.date}</small>
			<p
				dangerouslySetInnerHTML={{
					__html: node.frontmatter.description || node.excerpt,
				}}
			/>
		</div>
	}
}

class BlogIndex extends React.Component {

	compare(e1,e2) {
		let s1 = e1.node.frontmatter.title
		let s2 = e2.node.frontmatter.title
		if(s1 < s2) {
			return -1
		}
		if(s1 > s2) {
			return 1
		}
		return 0
	}

	render() {
		const { data } = this.props
		const siteTitle = data.site.siteMetadata.title
		const posts = data.allMarkdownRemark.edges //.sort(this.compare)

		let fedge = posts.find(e => e.node.frontmatter.title === 'Биография');
		let fnode = fedge.node
		console.log('FNODE: ', fnode)
		const ftitle = fnode.frontmatter.title || fnode.fields.slug

		let otherPosts = posts.filter(e => e.node.frontmatter.title !== 'Hello');

		return (
			<Layout location={this.props.location} title={siteTitle}>
				<SEO
					title="All posts"
					keywords={[`blog`, `gatsby`, `javascript`, `react`]}
				/>
				<Bio />
				


				<BlogNode node={fnode}/>
			

				{
					otherPosts.map(({ node }) => {
						return <BlogNode key={node.frontmatter.title} node={node}/>
					})

				}

			</Layout>
		)
	}
}

export default BlogIndex

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						title
						description
					}
				}
			}
		}
	}
`
