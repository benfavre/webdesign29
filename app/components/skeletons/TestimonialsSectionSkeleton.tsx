export function TestimonialsSectionSkeleton() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="h-10 w-80 bg-gray-200 rounded-md mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 w-full max-w-2xl bg-gray-200 rounded-md mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md flex flex-col h-64 animate-pulse">
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <div key={starIndex} className="h-5 w-5 bg-gray-200 rounded-full mr-1"></div>
                ))}
              </div>
              <div className="space-y-2 mb-6 flex-grow">
                <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
              </div>
              <div className="flex items-center mt-auto">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <div className="h-5 w-32 bg-gray-200 rounded-md mb-1"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

