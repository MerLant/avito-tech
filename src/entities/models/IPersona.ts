export interface PersonListProps {
  persons: Person[];
}

export interface Person {
  id: number;
  photo: string | null;
  name: string | null;
  enName: string | null;
  description: string | null;
  profession: string | null;
  enProfession: string | null;
}
