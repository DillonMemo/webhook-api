interface SearchItemDto {
  title: string;
  link: string;
  description: string;
  bloggername?: string;
  bloggerlink?: string;
  originallink?: string;
  postdate: string;
}
export interface SearchDto {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: SearchItemDto[];
}
