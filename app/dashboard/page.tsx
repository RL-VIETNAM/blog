import { redirect } from 'next/navigation';
import { getCurrentUser, getUserProfile } from '@/lib/auth-server';

export default async function DashboardPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/login');
    }

    const profile = await getUserProfile(user.id);

    if (!profile || profile.role !== 'admin') {
        redirect('/');
    }

    return (
        <div></div>
    );
}
