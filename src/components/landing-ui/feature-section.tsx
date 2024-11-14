import { BookOpen, Star, Users } from "lucide-react";

export default function FeatureSection(){
    return(
        <section className="w-full flex justify-center items-center py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Why Choose Course Geeks?
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Star className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Honest Reviews</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Real reviews from students who've taken the courses.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <BookOpen className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Comprehensive Listings</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Detailed information on thousands of online courses.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Users className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Community Driven</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Join discussions and share your learning experiences.
                </p>
              </div>
            </div>
          </div>
        </section>
    )
}