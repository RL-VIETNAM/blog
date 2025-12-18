import LatestPosts from '@/components/sections/LatestPosts';
import { mockPosts } from '@/lib/mockData';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <LatestPosts posts={mockPosts} />
    </main>
  );
}
