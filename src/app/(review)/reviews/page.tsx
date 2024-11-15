import { GetReviews } from "@/actions/review-action"

export default async function Reviews() {
    const reviews = await GetReviews()
    return(
        <div>
            {reviews.map((review) => (
                <div key={review.id}>
                    <h1>{review.coursename}</h1>
                    <p>{review.coursedescription}</p>
                    <p>Category: {review.category}</p>
                    <p>Average Rating: {review.averageRating}</p>
                </div>
            ))}
        </div>
    )
}