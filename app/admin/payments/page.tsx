import { AdminPayments } from "@/components/admin/payments"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab } = await searchParams
  const initialTab =
    tab === "service-wallet" || tab === "stk-push" || tab === "card-payments"
      ? tab
      : "transactions"
  return <AdminPayments initialTab={initialTab} />
}
