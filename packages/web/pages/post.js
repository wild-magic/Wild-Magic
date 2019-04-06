import { Component } from 'react';
import Link from 'next/link';
import Header from '../components/header';
import ReactMarkdown from 'react-markdown';

class Post extends Component {
  static async getInitialProps({ pathname, res }) {
    try {
      console.log('hello worldddd', pathname);
      const content = await require(`../${pathname}.md`).default;
      return { content };
    } catch (error) {
      res.statusCode = 404;
    }
    return {};
  }

  render() {
    const { content } = this.props;
    if (!content) {
      // return <Error statusCode={404} />;
      return <h1>no content</h1>;
    }
    return (
      <main>
        <Header />
        <section>
          <ReactMarkdown source={this.props.content} />
          <Link href="/">
            <a>Go to Home</a>
          </Link>
        </section>
      </main>
    );
  }
}

export default Post;
