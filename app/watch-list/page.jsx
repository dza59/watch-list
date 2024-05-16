import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import WatchForm from '../components/WatchForm';
import EditWatch from '../components/EditWatch';
import DeleteWatch from '../components/DeleteWatch';

async function WatchList() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  const { data: watches, error } = await supabase
    .from('watches')
    .select('*')
    .eq('user_id', user.id)
    .order('brand', { ascending: true });

  if (error) {
    console.error('Error fetching watches');
  }

  return (
    <div className='min-h-screen bg-gray-900 text-gray-300'>
      <div className='container mx-auto p-6 sm:p-12'>
        <div className='flex justify-between items-start'>
          <h1 className='text-5xl md:text-6xl font-extrabold text-white mb-6 text-center mx-auto'>
            My Watch List
          </h1>
          <form action='/auth/signout' method='post'>
            <button
              type='submit'
              className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
            >
              Sign out
            </button>
          </form>
        </div>
        <div className='container sm:w-1/2 mx-auto border-spacing-1'>
          <WatchForm />
        </div>

        <div className='mt-6'>
          {watches.map((watch) => (
            <div
              key={watch.id}
              className='bg-gray-800 p-6 rounded-lg shadow-lg mb-6'
            >
              <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-bold text-white'>{watch.brand}</h2>
                <div>
                  <EditWatch
                    watch={watch}
                    className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2'
                  />
                  <DeleteWatch watchId={watch.id} />
                </div>
              </div>
              <p className='text-lg text-gray-400'>
                {watch.model} - {watch.reference_number}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WatchList;
