import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { query } from '../lib/db';

type Problem = {
  id: number;
  subject: string;
  type: string;
  difficulty: string;
  problem: string;
  solution: string;
};

type HomeProps = {
  problems: Problem[];
};

export default function Home({ problems }: HomeProps) {
  return (
    <>
      <h1>Math Problems</h1>
      <p>
        Welcome to the math problems app! Use the navigation links above to
        create a new problem or view existing problems.
      </p>
      <h2>Recent Problems</h2>
      {problems.map((problem) => (
        <div key={problem.id}>
          <h3>
            <Link href={`/problems/${problem.id}`}>
              <a>{problem.subject}</a>
            </Link>
          </h3>
          <p>{problem.problem}</p>
        </div>
      ))}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const problems = await query(
    'SELECT id, subject, problem_type, difficulty, problem, solution FROM problems ORDER BY id DESC LIMIT 10'
  );


  return { props: { problems } };
};
