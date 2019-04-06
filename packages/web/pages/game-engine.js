import { Component } from 'react';
import Link from 'next/link';
import Header from '../components/header';
import ReactMarkdown from 'react-markdown';

class AboutPage extends Component {
  static async getInitialProps() {
    const content = await require(`../docs/test.md`).default;
    return { content };
  }

  render() {
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

export default AboutPage;
