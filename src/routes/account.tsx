import { createFileRoute, Outlet, Link, redirect, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { SectionLabel } from "@/components/ui-bits";
import { supabase } from "@/lib/supabase/client";

export const Route = createFileRoute("/account")({
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
  component: AccountLayout,
});

const tabs = [
  { to: "/account", label: "Profile" },
  { to: "/account/favorites", label: "Favorites" },
  { to: "/account/inquiries", label: "Inquiries" },
  { to: "/account/delivery", label: "Delivery" },
] as const;

function AccountLayout() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    await router.invalidate();
    toast.success("Logged out.");
    router.history.push("/");
  }

  return (
    <section className="mx-auto max-w-5xl px-6 lg:px-10 py-16 lg:py-20">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <SectionLabel>My Account</SectionLabel>
          <h1 className="font-serif text-4xl text-ink mt-4">Your Stylr.store account</h1>
        </div>
        <button
          onClick={handleLogout}
          className="border border-hairline text-muted-ink hover:text-ink hover:border-ink transition-colors px-5 py-2.5 text-xs uppercase tracking-[0.22em]"
        >
          Log out
        </button>
      </div>

      <nav className="mt-10 flex flex-wrap gap-2 border-b border-hairline pb-px">
        {tabs.map((tab) => (
          <Link
            key={tab.to}
            to={tab.to}
            activeOptions={{ exact: tab.to === "/account" }}
            className="px-4 py-3 text-xs uppercase tracking-[0.18em] text-muted-ink border-b-2 border-transparent hover:text-ink"
            activeProps={{
              className:
                "px-4 py-3 text-xs uppercase tracking-[0.18em] text-gold-deep border-b-2 border-gold",
            }}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <div className="mt-10">
        <Outlet />
      </div>
    </section>
  );
}
