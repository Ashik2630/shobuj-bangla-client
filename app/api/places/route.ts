import { NextResponse } from "next/server";
import { getPlacesCollection } from "@/lib/mongodb";

export async function GET() {
  try {
    const collection = await getPlacesCollection();
    const places = await collection.find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ success: true, places });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to fetch places" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const collection = await getPlacesCollection();

    const place = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(place);

    return NextResponse.json({ success: true, place: { ...place, _id: result.insertedId } }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to save place" }, { status: 500 });
  }
}
