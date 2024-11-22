import { getStats, GetReviewsAdmin } from "@/actions/admin-action"
import ReviewTable from "@/components/dashboard/review-table"
import StatsCard from "@/components/dashboard/stats-card"
import Pagination from "@/components/pagination"
import SearchBar from "@/components/search-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const {getUser} = getKindeServerSession()
  const user = await getUser()

  if(!user){
    return redirect("/api/auth/login")
  }

  const {usercount, reviewcount} = await getStats()
  const {count, reviewsWithDetails} = await GetReviewsAdmin(searchParams)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard count={usercount} title="Users"/>
        <StatsCard count={reviewcount} title="Reviews"/>
        <StatsCard count={60} title="Reports"/>
      </div>
      <SearchBar/>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
    
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ReviewTable reviews={reviewsWithDetails}/>
          </CardContent>
        </Card>

      </div>
      <Pagination totalPages={Math.ceil(count / 10)} />
      </div>
  )
}

