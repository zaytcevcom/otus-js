export interface Problem {
  title: string;
  description: string;
  inputExample: string;
  outputExample: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  additionalMaterials: number[];
  createdBy: number;
  id?: number;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
