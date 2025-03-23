export class AdditionalMaterial {
  id: number;
  problemId: number;
  type: 'file' | 'link';
  content: string; // URL для ссылок или путь к файлу
  description: string;
}
