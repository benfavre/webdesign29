import { NextResponse } from "next/server"
import { getTestimonials } from "@/app/lib/data"

export async function GET() {
  try {
    const testimonials = await getTestimonials()
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("Failed to fetch testimonials:", error)
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}

