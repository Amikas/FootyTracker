import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const reminderId = searchParams.get("id");

    if (!reminderId) {
      return new NextResponse("Missing reminder ID", { status: 400 });
    }

    const reminder = await prisma.reminder.update({
      where: {
        id: reminderId,
        userId: session.user.id,
      },
      data: {
        isCompleted: true,
        lastTriggered: new Date(),
      },
    });

    return NextResponse.json(reminder);
  } catch (error) {
    console.error("[REMINDERS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const reminderId = searchParams.get("id");

    if (!reminderId) {
      return new NextResponse("Missing reminder ID", { status: 400 });
    }

    await prisma.reminder.delete({
      where: {
        id: reminderId,
        userId: session.user.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[REMINDERS_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
