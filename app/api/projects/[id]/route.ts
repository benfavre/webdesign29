import { getProjectById } from "@/app/lib/data";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: Promise<{ params: { id: string } }>,
) {
	const { id } = await params;
	console.log("Fetching project with id:", id);
	const project = await getProjectById(id);
	return NextResponse.json(project);
}
