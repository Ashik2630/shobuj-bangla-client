import { NextResponse } from "next/server";
import { getItemsCollection } from "@/lib/mongodb";
import { auth } from "@/lib/auth";

function serializeItem(item: Record<string, unknown>) {
  const { _id, ...rest } = item;
  return { ...rest, _id: _id ? String(_id) : null };
}

export async function GET() {
  try {
    const collection = await getItemsCollection();
    const items = await collection.find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({
      success: true,
      items: items.map((item) => serializeItem(item as Record<string, unknown>)),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to load items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    const user = session?.user ?? null;

    const body = await request.json();

    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const collection = await getItemsCollection();

    const item = {
      title: body.title,
      shortDescription: body.shortDescription,
      fullDescription: body.fullDescription,
      price: body.price ?? null,
      date: body.date ? new Date(body.date) : null,
      priority: body.priority ?? null,
      image: body.image ?? null,
      createdAt: new Date(),
      createdBy: user.id ?? user.email ?? null,
    };

    const result = await collection.insertOne(item);

    return NextResponse.json({ success: true, item: { ...item, _id: result.insertedId } }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to save item" }, { status: 500 });
  }
}
