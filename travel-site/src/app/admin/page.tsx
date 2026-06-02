import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { AdminLogin } from "@/components/admin/admin-login";
import { PageShell } from "@/components/layout/site-shell";
import { isAdmin } from "@/lib/auth";
import { getAdminData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const authed = await isAdmin();
  const error = Boolean(params.error);

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {authed ? (
          <AdminDashboard data={await getAdminData()} />
        ) : (
          <AdminLogin error={error} />
        )}
      </section>
    </PageShell>
  );
}
