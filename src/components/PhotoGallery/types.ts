export interface Photo {
  id: string;
  src: string;
  alt: string;
  category: Category;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export type Category = 
  | 'team-vibes'
  | 'creative-campaigns'
  | 'work-hard-play-hard'
  | 'behind-the-scenes';

export interface CategoryInfo {
  id: Category;
  label: string;
  description: string;
  icon: string;
}