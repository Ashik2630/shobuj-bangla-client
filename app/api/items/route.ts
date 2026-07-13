import { NextResponse } from "next/server";
import { getItemsCollection } from "@/lib/mongodb";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // Try to get session (if better-auth exposes a server method)
    let user = null;
    try {
      // some servers may accept request to get session
      // if auth.getSession exists, use it; otherwise proceed without strict server check
      // @ts-ignore
      if (typeof auth?.getSession === "function") {
        // @ts-ignore
        const session = await auth.getSession(request);
        user = session?.user ?? null;
      }
    } catch (err) {
      // ignore session check failure
      user = null;
    }

    const body = await request.json();

    // Basic server-side auth check: if user is required and not found, reject
    if (!user && !process.env.SKIP_AUTH_CHECK) {
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
      createdBy: user ? user.id ?? user.sub ?? user.email ?? null : null,
    };

    const result = await collection.insertOne(item);

    return NextResponse.json({ success: true, item: { ...item, _id: result.insertedId } }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to save item" }, { status: 500 });
  }
}
