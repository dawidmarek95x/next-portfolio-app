import Head from "next/head";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.scss";
import { getAllProjectIds, getProjectData } from "../../lib/projects";
import { GetStaticPaths, GetStaticProps } from "next";

interface ProjectData {
  projectData: {
    title: string;
    contentHtml: string;
  };
}

const Project = ({ projectData }: ProjectData) => {
  return (
    <Layout>
      <Head>
        <title>{projectData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{projectData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} />
      </article>
    </Layout>
  );
};

export default Project;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllProjectIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const projectData = await getProjectData(params?.id as string);
  return {
    props: {
      projectData,
    },
  };
};
