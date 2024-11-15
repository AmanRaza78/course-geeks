import ReviewForm from "@/components/forms/review-form"
import { Card } from "@/components/ui/card"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

export default async function PostReview(){
    const {isAuthenticated} = getKindeServerSession()
    const isLoggedIn = await isAuthenticated()
    if(!isLoggedIn){
        return redirect("/api/auth/login")
    }


    return(
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14 mt-6">
        <Card>
            <ReviewForm/>
        </Card>
      </section>
    )
}