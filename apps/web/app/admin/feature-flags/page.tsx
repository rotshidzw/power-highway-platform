import { redirect } from 'next/navigation';

export default function LegacyFeatureFlagsPage() {
  redirect('/app/admin/feature-flags');
}
