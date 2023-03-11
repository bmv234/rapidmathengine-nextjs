import Layout from '../../components/Layout';
import { query } from '../../lib/db';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface Props {
  subject: string;
  type: string;
  difficulty: string;
  problem: string;
  solution: string;
}

export default function Problem({
  subject,
  type,
  difficulty,
  problem,
  solution,
}: Props) {
  return (
    <Layout>
      <h1>{subject}</h1>
      <h2>{type}</h2>
      <h3>{difficulty}</h3>
      <p>{problem}</p>
      <p>{solution}</p>
    </Layout>
  );
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const { id } = params!;
  const problems = await query(
    'SELECT subject, type, difficulty, problem, solution FROM problems WHERE problem_id = ?',
    [id]
  );

  const [problem] = JSON.parse(JSON.stringify(problems));
  return {
    props: problem,
  };
};
