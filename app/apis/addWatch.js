'use server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function addWatch(formData) {
  const { model, brand, reference_number } = formData;

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.error('User is not authenticated within addWatch server action');
    return;
  }

  const { data, error } = await supabase.from('watches').insert([
    {
      model,
      brand,
      reference_number,
      user_id: user.id,
    },
  ]);

  if (error) {
    console.error('Error inserting data', error);
    return;
  }

  revalidatePath('/watch-list');
  //TODO: clear form fields after submission

  return { message: 'Success' };
}
