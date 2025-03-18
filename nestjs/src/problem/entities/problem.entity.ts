import { AdditionalMaterial } from '../../additional-material/entities/additional-material.entity';

export class Problem {
  id: number;
  title: string;
  description: string;
  inputExample: string;
  outputExample: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  additionalMaterials: AdditionalMaterial[];
  rating: number;
  createdBy: number; // ID пользователя-создателя
  createdAt: Date;
  updatedAt: Date;
}
