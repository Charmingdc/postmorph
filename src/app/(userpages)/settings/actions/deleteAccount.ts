'use server';

import { createAdminClient } from '@/utils/supabase/createAdminClient';
import { createClient } from '@/utils/supabase/server';
import { deleteAvatarFolder } from '@/utils/supabase/deleteAvatarFolder';
import { redirect } from 'next/navigation';

const deleteAccount = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (!user || error) {
    throw new Error('User not found or unauthorized.');
  }

  await deleteAvatarFolder(user.id);

  const admin = createAdminClient();
  const { error: deleteError } = await admin.auth.admin.deleteUser(user.id);

  if (deleteError) {
    throw new Error('Failed to delete user: ' + deleteError.message);
  }

  // Sign out and clear session
  await supabase.auth.signOut();
  redirect('/auth/signin');
};

export default deleteAccount;
