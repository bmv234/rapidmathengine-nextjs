import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import MathJax from 'react-mathjax2';
import { post } from './api/problems';

type Props = {};

type Problem = {
  subject: string;
  difficulty: string;
  problem: string;
  solution: string;
};

const CreateProblem: React.FC<Props> = () => {
  const router = useRouter();
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newProblem: Problem = {
      subject,
      difficulty,
      problem,
      solution
    };

    await post(newProblem);
    router.push('/');
  };

  return (
    <Layout>
      <h1>Create a Problem</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            className="form-control"
            id="subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty</label>
          <input
            type="text"
            className="form-control"
            id="difficulty"
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="problem">Problem</label>
          <MathJax math={problem}>
            {() => (
              <textarea
                className="form-control"
                id="problem"
                rows={3}
                value={problem}
                onChange={(event) => setProblem(event.target.value)}
                required
              />
            )}
          </MathJax>
        </div>
        <div className="form-group">
          <label htmlFor="solution">Solution (optional)</label>
          <MathJax math={solution}>
            {() => (
              <textarea
                className="form-control"
                id="solution"
                rows={3}
                value={solution}
                onChange={(event) => setSolution(event.target.value)}
              />
            )}
          </MathJax>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default CreateProblem;
