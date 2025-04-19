export interface Problem {
  id?: number;
  title: string;
  description: string;
  inputExample: string;
  outputExample: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  additionalMaterials: number[];
  rating?: number;
  createdBy: number;
  createdAt?: Date;
  updatedAt?: Date;
}
