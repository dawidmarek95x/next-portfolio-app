import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.scss";
import { getSortedProjectsData } from "../lib/projects";
import { GetStaticProps } from "next";
import { ProjectWithId } from "../types/projects";

interface ProjectsData {
  allProjectsData: ProjectWithId[];
}

interface HomeProps {
  props: ProjectsData;
}

const Home = ({ allProjectsData }: ProjectsData) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello, I am Dawid. I am a Junior Full-Stack Developer dealing with the
          design and construction of web applications both on the client and
          server side in accordance with applicable standards.
        </p>
        <p>
          The technological stack that I use to create applications is: Next.js,
          React, Redux, Nest.js, Node.js, Express.js, TypeScript, JavaScript,
          MongoDB, Tailwind CSS, Bootstrap, Styled Components, SASS/CSS3 and
          HTML5.
        </p>
        <p>
          You can contact me on{" "}
          <a href="https://www.linkedin.com/in/dawid-marek95/">LinkedIn</a> or
          by <a href="mailto:dawid.marek@gmail.com">email</a>.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Portfolio</h2>
        <ul className={utilStyles.list}>
          {allProjectsData.map(({ id, stack, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/projects/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>{stack}</small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (): Promise<HomeProps> => {
  const allProjectsData = getSortedProjectsData();

  return {
    props: {
      allProjectsData,
    },
  };
};
