import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.scss";
import { getSortedProjectsData } from "../lib/projects";

const Home = ({ allProjectsData }) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello, I am Dawid. I am a Junior Full-Stack Developer dealing with
          designing and building web applications using React, Redux,
          TypeScript, JavaScript, Styled Components, SASS/CSS3, HTML5 on the
          client side and Node.js, Express.js, MongoDB on the server side in
          accordance with current standards.
        </p>
        <p>
          You can contact me on{" "}
          <a href="https://www.linkedin.com/in/dawid-marek95/">LinkedIn</a> or by{" "}<a href="mailto:dawid.marek@gmail.com">email</a>.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Portfolio</h2>
        <ul className={utilStyles.list}>
          {allProjectsData.map(({ id, stack, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/projects/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                {stack}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Home;

export const getStaticProps = async () => {
  const allProjectsData = getSortedProjectsData();

  return {
    props: {
      allProjectsData,
    },
  };
};
