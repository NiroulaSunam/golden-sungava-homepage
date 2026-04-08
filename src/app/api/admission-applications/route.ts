import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/backend/db';

const admissionApplicationSchema = z.object({
  studentName: z.string().min(1, 'Student name is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  grade: z.string().min(1, 'Grade is required'),
  parentName: z.string().min(1, 'Parent name is required'),
  parentPhone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Valid email required'),
  address: z.string().min(1, 'Address is required'),
});

export const POST = async (request: NextRequest) => {
  try {
    const body = admissionApplicationSchema.parse(await request.json());

    const { data, error } = await supabaseAdmin
      .from('admission_applications')
      .insert({
        student_name: body.studentName,
        dob: body.dob,
        grade: body.grade,
        parent_name: body.parentName,
        parent_phone: body.parentPhone,
        email: body.email,
        address: body.address,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.flatten() }, { status: 400 });
    }

    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
