export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  order: number;
  type: 'concept' | 'problem' | 'quiz' | 'video';
  content: string; // Markdown or structured JSON
  question?: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
  xpReward: number;
  createdAt: Date;
  updatedAt: Date;
}
