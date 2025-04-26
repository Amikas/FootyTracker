import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { z } from 'zod';
import type { EventAttachment } from '../../../../prisma/generated/client';

const attachmentSchema = z.object({
  eventId: z.string(),
  name: z.string(),
  type: z.string(),
  url: z.string().url(),
  size: z.number(),
});

// POST /api/calendar/attachments
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = attachmentSchema.parse(body);

    // Verify the event belongs to the user
    const event = await prisma.calendarEvent.findUnique({
      where: {
        id: validatedData.eventId,
        userId: session.user.id,
      },
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found or unauthorized' },
        { status: 404 }
      );
    }

    const attachment = await prisma.eventAttachment.create({
      data: validatedData,
    });

    return NextResponse.json(attachment, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid attachment data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating attachment:', error);
    return NextResponse.json(
      { error: 'Failed to create attachment' },
      { status: 500 }
    );
  }
}

// DELETE /api/calendar/attachments
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const attachmentId = searchParams.get('id');
    if (!attachmentId) {
      return NextResponse.json(
        { error: 'Attachment ID is required' },
        { status: 400 }
      );
    }

    // Verify the attachment belongs to the user's event
    const attachment = await prisma.eventAttachment.findUnique({
      where: { id: attachmentId },
      include: { event: true },
    });

    if (!attachment || attachment.event.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Attachment not found or unauthorized' },
        { status: 404 }
      );
    }

    await prisma.eventAttachment.delete({
      where: { id: attachmentId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting attachment:', error);
    return NextResponse.json(
      { error: 'Failed to delete attachment' },
      { status: 500 }
    );
  }
} 