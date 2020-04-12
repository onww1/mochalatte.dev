// @flow strict
import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';
import type { MarkdownRemark } from '../types';

type Props = {
  data: {
    markdownRemark: MarkdownRemark,
    allMarkdownRemark: AllMarkdownRemark
  }
};

const PageTemplate = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { html: pageBody } = data.markdownRemark;
  const { frontmatter } = data.markdownRemark;
  const {
    title: pageTitle,
    description: pageDescription,
    socialImage
  } = frontmatter;
  const metaDescription =
    pageDescription !== null ? pageDescription : siteSubtitle;
  const posts = data.allMarkdownRemark.edges;
  const isRendering =
    posts.length > 0 && posts[0].node.frontmatter.category !== 'About';

  return (
    <Layout
      title={`${pageTitle} - ${siteTitle}`}
      description={metaDescription}
      socialImage={socialImage}
    >
      <Sidebar />
      <Page title={pageTitle}>
        <div dangerouslySetInnerHTML={{ __html: pageBody }} />
        {isRendering && (
          <>
            <h2>Article List</h2>
            <ul>
              {posts.map(post => (
                <li key={post.node.fields.slug}>
                  <Link to={post.node.fields.slug}>
                    {post.node.frontmatter.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query PageBySlug($slug: String!, $category: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date
        description
        socialImage
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: {
          category: { eq: $category }
          template: { eq: "post" }
          draft: { ne: true }
        }
      }
      sort: { order: ASC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            categorySlug
            slug
          }
          frontmatter {
            date
            description
            category
            title
          }
        }
      }
    }
  }
`;

export default PageTemplate;
