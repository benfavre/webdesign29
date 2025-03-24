export function ProjectsSectionSkeleton() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="h-10 w-64 bg-gray-200 rounded-md mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 w-full max-w-2xl bg-gray-200 rounded-md mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden h-64 animate-pulse">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gray-200 h-12 w-12 rounded-full"></div>
                  <div className="bg-gray-200 h-4 w-24 rounded-md"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded-md mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-md mb-4"></div>
                <div className="h-10 bg-gray-200 rounded-md w-full"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <div className="h-10 w-48 bg-gray-200 rounded-md mx-auto animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

