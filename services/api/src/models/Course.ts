export interface Course {
  id: string;
  title: string;
  slug: string;
  area: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  lessonCount: number;
  thumbnailUrl?: string;
  instructorId: string;
  isPublished: boolean;
  price: number; // in AOA (0 = free)
  createdAt: Date;
  updatedAt: Date;
}
