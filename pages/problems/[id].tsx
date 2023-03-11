import React from 'react';
import { GetServerSideProps } from 'next';
import MathJax from 'react-mathjax2';
import Layout from '../../components/Layout';
import { query } from '../api/problems';

type Props = {
  id: number;
  subject: string;
  type: string;
  difficulty: string;
  problem: string;
  solution: string;
};

const renderSolution = (solution: string) => (
  <MathJax math={solution}>
    {() => <span>{`$${solution}$`}</span>}
  </MathJax>
);

const Problem: React.FC<Props> = ({
  id,
  subject,
  type,
  difficulty,
  problem,
  solution
}) => (
  <Layout>
    <h1>Problem {id}</h1>
    <p>
      <strong>Subject:</strong> {subject}
    </p>
    <p>
      <strong>Type:</strong> {type}
    </p>
    <p>
      <strong>Difficulty:</strong> {difficulty}
    </p>
    <p>
      <strong>Problem:</strong>{' '}
      <MathJax math={problem}>
        {() => <span>{`$${problem}$`}</span>}
      </MathJax>
    </p>
    {solution && (
      <p>
        <strong>Solution:</strong> {renderSolution(solution)}
      </p>
    )}
  </Layout>
);

export default Problem;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params;
  const rows = await query('SELECT * FROM problems WHERE id = ?', [id]);
  const [problem] = rows;
  return {
    props: {
      ...problem
    }
  };
};
