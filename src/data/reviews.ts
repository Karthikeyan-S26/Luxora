export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    author: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    date: '2 days ago',
    title: 'The best headphones I have ever owned',
    comment: 'The active noise cancellation on NovaSound Pro Max is unmatched. The spatial acoustic staging feels live.',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    date: '1 week ago',
    title: 'Flawless build quality and insane speed',
    comment: 'Compiling Rust projects and rendering 4K video streams simultaneous without even spinning fans. Worth every penny.',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'David Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    rating: 4,
    date: '2 weeks ago',
    title: 'High energy return for long distance runs',
    comment: 'The carbon propulsion plate in the NovaGlide gives noticeable spring during tempo runs. Lightweight and breathable.',
    verified: true
  }
];
