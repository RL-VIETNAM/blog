import LatestPosts from '@/components/sections/LatestPosts';
import { getPosts } from '@/lib/posts';

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-white">
      <LatestPosts posts={posts} />
    </main>
  );
}
