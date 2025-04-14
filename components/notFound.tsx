"use client"

import { NotFound } from "@sec/not-found"
import { Button } from "./common"
import { RefreshCw, Home, Filter, AlertOctagon } from "lucide-react"

export const NotFoundExamples = () => {
  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold mb-6">NotFound Component Examples</h1>

      <div>
        <h2 className="text-xl font-semibold mb-3">Basic Example</h2>
        <NotFound />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Payment Methods Example</h2>
        <NotFound
          title="No Payment Attempts Found"
          description="There are no payment attempts using Credit Card."
          icon="alert-circle"
          iconClassName="text-default-400"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Search Results Example</h2>
        <NotFound
          title="No Search Results"
          description="We couldn't find any results matching your search criteria."
          icon="search"
          iconClassName="text-blue-400"
          containerClassName="bg-blue-50 border border-blue-100"
          action={
            <Button variant="bordered" placeholder="Clear Filters" size="sm" className="mt-2">
              <RefreshCw className="mr-2 h-4 w-4" />
            </Button>
          }
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Error Example</h2>
        <NotFound
          title="Something Went Wrong"
          description="We encountered an error while loading your data. Please try again later."
          icon="alert-triangle"
          iconClassName="text-red-500"
          containerClassName="bg-red-50 border border-red-100"
          titleClassName="text-red-700"
          descriptionClassName="text-red-600"
          action={
            <Button variant="solid" size="sm" placeholder="Retry" className="mt-2">
              <RefreshCw className="mr-2 h-4 w-4" />
            </Button>
          }
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Custom Icon Example</h2>
        <NotFound
          title="No Filters Applied"
          description="Try applying some filters to narrow down your results."
          icon={<Filter className="mx-auto mb-4 text-purple-500" size={48} />}
          containerClassName="bg-purple-50 border border-purple-100"
          titleClassName="text-purple-800"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">With Footer Example</h2>
        <NotFound
          title="Page Not Found"
          description="The page you're looking for doesn't exist or has been moved."
          icon="file-question"
          iconClassName="text-orange-500"
          containerClassName="bg-orange-50 border border-orange-100"
          action={
            <Button variant="flat" placeholder="Go Home" size="sm" className="mt-2">
              <Home className="mr-2 h-4 w-4" />
            </Button>
          }
          footer={<p className="text-sm text-gray-500">If you believe this is an error, please contact support.</p>}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Completely Custom Example</h2>
        <NotFound
          icon={
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
              <AlertOctagon className="text-white" size={32} />
            </div>
          }
          containerClassName="bg-gradient-to-r from-pink-50 to-purple-50 border border-purple-100 shadow-md"
        >
          <div className="space-y-3">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
              Custom Content Example
            </h3>
            <p className="text-gray-600">
              This example shows how you can completely customize the content using children.
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <Button variant="bordered" placeholder="Cancel" size="sm" />
              <Button size="sm" placeholder="Try Again" className="bg-gradient-to-r from-pink-500 to-purple-500 text-white" />
            </div>
          </div>
        </NotFound>
      </div>
    </div>
  )
}