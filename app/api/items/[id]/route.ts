import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getItemsCollection } from "@/lib/mongodb";
import { auth } from "@/lib/auth";

function serializeItem(item: Record<string, unknown>) {
  const { _id, ...rest } = item;
  return { ...rest, _id: _id ? String(_id) : null };
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const collection = await getItemsCollection();

    const item = await collection.findOne({ _id: new ObjectId(id) });

    if (!item) {
      return NextResponse.json({ success: false, message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, item: serializeItem(item as Record<string, unknown>) });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to load item" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const collection = await getItemsCollection();

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Item deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to delete item" }, { status: 500 });
  }
}
