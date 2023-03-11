import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  switch (method) {
    case 'POST':
      try {
        const { subject, problem_type, difficulty, problem, solution } = body;
        if (!subject || !problem_type || !difficulty || !problem) {
          return res.status(400).json({ message: 'Missing required fields' });
        }
        const result = await query(
          'INSERT INTO problems (subject, problem_type, difficulty, problem, solution) VALUES (?, ?, ?, ?, ?)',
          [subject, problem_type, difficulty, problem, solution || null]
        );
        const insertedId = result.insertId;
        const problemData = await query(
          'SELECT id, subject, problem_type, difficulty, problem, solution FROM problems WHERE id = ?',
          insertedId
        );
        const [newProblem] = JSON.parse(JSON.stringify(problemData));
        res.status(201).json(newProblem);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating problem' });
      }
      break;
    case 'GET':
      try {
        const problems = await query(
          'SELECT id, subject, problem_type, difficulty, problem, solution FROM problems ORDER BY id DESC'
        );
        res.status(200).json(problems);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving problems' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ message: `Method ${method} not allowed` });
      break;
  }
}
