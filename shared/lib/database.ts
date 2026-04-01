// Database helper functions — PORTECOS ACADEMIC IA
// Uses Supabase to query students, progress, sessions, etc.

import { getSupabaseServer } from './supabase';

// Get student progress data for the mentor service
export async function getStudentProgress(studentId: string) {
  const supabase = getSupabaseServer();

  // Get active enrollment with program and term info
  const { data: enrollment, error: enrollmentError } = await supabase
    .from('program_enrollments')
    .select('*, programs(*), terms(*)')
    .eq('user_id', studentId)
    .eq('status', 'active')
    .maybeSingle();

  if (enrollmentError) {
    console.warn('[PORTECOS] Could not fetch enrollment for student:', enrollmentError.message);
  }

  const programId = enrollment?.program_id;

  // Count completed competencies
  const { count: completedCount } = await supabase
    .from('assessment_results')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', studentId)
    .eq('status', 'competent');

  // Count total competencies for the program
  const { count: totalCount } = programId
    ? await supabase
        .from('competencies')
        .select('*', { count: 'exact', head: true })
        .eq('program_id', programId)
    : { count: null };

  // Get active term
  const { data: term, error: termError } = await supabase
    .from('terms')
    .select('*')
    .eq('user_id', studentId)
    .eq('status', 'active')
    .maybeSingle();

  if (termError) {
    console.warn('[PORTECOS] Could not fetch term for student:', termError.message);
  }

  // Get user streak and last activity
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('streak, last_active_at')
    .eq('id', studentId)
    .maybeSingle();

  if (userError) {
    console.warn('[PORTECOS] Could not fetch user record:', userError.message);
  }

  const daysRemaining = term
    ? Math.max(0, Math.floor((new Date(term.end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;
  const totalComp = totalCount || 40;
  const completed = completedCount || 0;

  return {
    studentId,
    completedCompetencies: completed,
    totalCompetencies: totalComp,
    termProgress: totalComp > 0 ? Math.round((completed / totalComp) * 100) : 0,
    daysRemaining,
    streak: user?.streak || 0,
    lastActivity: user?.last_active_at || new Date().toISOString(),
    enrollment,
    term,
  };
}

// Save a mentor chat session to the database
export async function saveMentorSession(
  userId: string,
  messages: unknown[],
  sessionType: string
) {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('mentor_sessions')
    .insert({
      user_id: userId,
      messages_json: messages,
      session_type: sessionType,
    })
    .select()
    .single();
  return { data, error };
}

// Save an assessment result to the database
export async function saveAssessmentResult(
  userId: string,
  assessmentId: string,
  status: string,
  feedback: string,
  attemptNumber: number
) {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('assessment_results')
    .insert({
      user_id: userId,
      assessment_id: assessmentId,
      status,
      feedback,
      attempt_number: attemptNumber,
    })
    .select()
    .single();
  return { data, error };
}

// Get published programs, optionally filtered by level or area
export async function getPrograms(filters?: { level?: string; areaId?: string }) {
  const supabase = getSupabaseServer();
  let query = supabase.from('programs').select('*, areas(*)').eq('is_published', true);
  if (filters?.level) query = query.eq('level', filters.level);
  if (filters?.areaId) query = query.eq('area_id', filters.areaId);
  const { data, error } = await query;
  return { data, error };
}

// Save generated lessons to the `lessons` table for a given course
export async function saveLessons(
  courseId: string,
  lessons: import('../types').GeneratedLesson[]
): Promise<void> {
  const supabase = getSupabaseServer();
  const rows = lessons.map((lesson) => ({
    course_id: courseId,
    title: lesson.title,
    order: lesson.order,
    type: lesson.type,
    content: lesson.content,
    question: lesson.question ?? null,
    options: lesson.options ?? null,
    correct_answer: lesson.correctAnswer ?? null,
    explanation: lesson.explanation ?? null,
    xp_reward: lesson.xpReward,
  }));

  const { error } = await supabase.from('lessons').insert(rows);
  if (error) {
    throw new Error(`[database] saveLessons failed: ${error.message}`);
  }
}

// Update a lesson's video URL after video generation completes
export async function updateLessonVideoUrl(lessonId: string, videoUrl: string): Promise<void> {
  const supabase = getSupabaseServer();
  const { error } = await supabase
    .from('lessons')
    .update({ video_url: videoUrl })
    .eq('id', lessonId);
  if (error) {
    throw new Error(`[database] updateLessonVideoUrl failed: ${error.message}`);
  }
}
