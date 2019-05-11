import React from 'react'
import { graphql } from 'gatsby'

import Hero from './../components/general/Hero'
import Blurb from './../components/general/Blurb'
import List from './../components/general/contentList'

import styled from 'styled-components'

import SEO from './../components/general/SEO'

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: 'ContentCover' 'ContentStart';
  @media screen and (min-width: 52em) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'ContentStart ContentCover';
  }
  @media screen and (min-width: 64em) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: 'ContentStart ContentCover ContentCover';
  }
`
const ContentStart = styled.div`
  grid-area: ContentStart;
  display: grid;
  grid-template-areas: 'ContentCopy' 'ContentList';
  padding: 3.5rem;
`
const ContentCopy = styled(Blurb)`
  grid-area: ContentCopy;
`
const ContentList = styled.div`
  grid-area: ContentList;
`
const ContentCover = styled.div`
  grid-area: ContentCover;
`

const Index = ({ data }) => {
  const home = data.contentfulHome
  const galleries = data.allContentfulExtendedGallery.edges
  return (
    <>
      <SEO image={home.shareImage} />
      <Content>
        <ContentStart>
          <ContentCopy content={home.body} />
          <ContentList>
            {galleries.map(({ node: gallery }) => (
              <List
                galleryList
                key={gallery.id}
                slug={gallery.slug}
                image={gallery.heroImage}
                title={gallery.title}
                date={gallery.publishDate}
                excerpt={gallery.body}
              />
            ))}
          </ContentList>
        </ContentStart>
        <ContentCover className="hide">
          <Hero image={home.heroImage} />
        </ContentCover>
      </Content>
    </>
  )
}

export const query = graphql`
  query Index {
    allContentfulExtendedGallery(
      limit: 1000
      sort: { fields: [publishDate], order: DESC }
    ) {
      edges {
        node {
          title
          id
          slug
          publishDate(formatString: "DD MMM YYYY h:mm a")
          heroImage {
            title
            fluid(quality: 65) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          body {
            childMarkdownRemark {
              excerpt(pruneLength: 140, format: HTML)
            }
          }
        }
      }
    }
    contentfulHome {
      title
      id
      heroImage {
        title
        fluid(maxWidth: 1600, quality: 65) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      shareImage {
        ogimg: resize(width: 1200, quality: 65) {
          src
          width
          height
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export default Index
