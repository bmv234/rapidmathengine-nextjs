import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { query } from '../lib/db';

export default function Create() {
  const router = useRouter();
  const [subject, setSubject] = useState('');
  const [type, setType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await query(
      'INSERT INTO problems (subject, type, difficulty, problem, solution) VALUES (?, ?, ?, ?, ?)',
      [subject, type, difficulty, problem, solution]
    );
    router.push('/');
  };

  return (
    <Layout>
      <h1>Create Problem</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <input
            id="type"
            type="text"
            value={type}
            onChange={(event) => setType(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="difficulty">Difficulty</label>
          <input
            id="difficulty"
            type="text"
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="problem">Problem</label>
          <textarea
            id="problem"
            value={problem}
            onChange={(event) => setProblem(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="solution">Solution</label>
          <textarea
            id="solution"
            value={solution}
            onChange={(event) => setSolution(event.target.value)}
          />
        </div>
        <button type="submit">Create Problem</button>
      </form>
    </Layout>
  );
}
