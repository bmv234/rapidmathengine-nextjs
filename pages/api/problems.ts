import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../lib/db';

type Problem = {
  id: number;
  subject: string;
  type: string;
  difficulty: string;
  problem: string;
  solution: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Problem[]>
): Promise<void> => {
  try {
    const rows = await query(
      'SELECT id, subject, type, difficulty, problem, solution FROM problems ORDER BY id DESC LIMIT 10',
      []
    );
    const problems = rows.map((row) => ({
      id: row.id,
      subject: row.subject,
      type: row.type,
      difficulty: row.difficulty,
      problem: row.problem,
      solution: row.solution
    }));
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
