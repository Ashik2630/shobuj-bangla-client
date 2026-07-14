import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getPlacesCollection } from "@/lib/mongodb";
import { auth } from "@/lib/auth";

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
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const collection = await getPlacesCollection();

    const place = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: session.user.id ?? session.user.email ?? null,
    };

    const result = await collection.insertOne(place);

    return NextResponse.json({ success: true, place: { ...place, _id: result.insertedId } }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to save place" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Missing place id" }, { status: 400 });
    }

    const collection = await getPlacesCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Place not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Place deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to delete place" }, { status: 500 });
  }
}
