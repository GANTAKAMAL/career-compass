/** Shared UI-side types. Shapes are finalised during backend integration. */

export interface UserProfile {
  fullName: string;
  email: string;
  careerGoal: string;
  education: string;
  experience: string;
  skills: string[];
}

export interface Job {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  matchPercentage?: number;
  matchingSkills?: string[];
  missingSkills?: string[];
}

export interface Recommendation {
  jobId: string;
  jobTitle: string;
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  explanation: string;
}

export interface SkillGap {
  targetJobId: string;
  targetJobTitle: string;
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  skillsToLearn: string[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: "job" | "skill";
}

export interface GraphEdge {
  source: string;
  target: string;
  relationship: string;
}

export interface KnowledgeGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: { key: "A" | "B" | "C" | "D"; text: string }[];
}

export interface AssessmentResult {
  assessmentId: string;
  skill?: string;
  score: number;
  totalQuestions: number;
  takenAt?: string;
}
