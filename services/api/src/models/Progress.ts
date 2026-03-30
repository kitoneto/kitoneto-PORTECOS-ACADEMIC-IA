export interface Progress {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  score?: number; // 0-100
  attempts: number;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
