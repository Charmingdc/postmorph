import Link from 'next/link';
import { Trash, PencilLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NoDataCard from '@/components/ui/no-data-card';
import type { DraftType } from '@/lib/types';

const RecentDrafts = () => {
  const drafts: DraftType[] = [
    {
      id: '1',
      type: 'thread',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaCupidatat consectetur veniam laboris eu laboris proident do reprehenderit et deserunt id pariatur excepteur. Mollit velit laboris elit labore culpa culpa add.',
      createdAt: '2025-05-22T10:00:00Z'
    },
    {
      id: '2',
      type: 'linkedln post',
      content:
        'Suspendisse potenti. Integer at libero et libero faucibus. Nulla facilisi. Aenean ut eros non ligula egestas placeratEu id veniam mollit nulla dolore exercitation amet qui sint ut sint culpa culpa. Velit ut anim non exercitation aliquip cillum laboris.',
      createdAt: '2025-05-22T10:05:00Z'
    },
    {
      id: '3',
      type: 'tweet',
      content:
        'Quisque tristique eros ut justo scelerisque, ut dictum eros egestas. In hac habitasse platea dictumstAute cupidatat quis voluptate laborum nisi do sunt. Mollit amet quis occaecat exercitation tempor culpa adipisicing reprehenderit sunt sunt officia.',
      createdAt: '2025-05-22T10:10:00Z'
    },
    {
      id: '4',
      type: 'reddit post',
      content:
        'Quisque tristique eros ut justo scelerisque, ut dictum eros egestas. In hac habitasse platea dictumstAute cupidatat quis voluptate laborum nisi do sunt. Mollit amet quis occaecat exercitation tempor culpa adipisicing reprehenderit sunt sunt officia.',
      createdAt: '2025-05-22T10:10:00Z'
    }
  ];

  return (
    <div className='my-12'>
      <h3 className='text-2xl font-bold mb-2'> Recent Drafts </h3>

      <div className='w-full h-auto flex flex-col gap-y-4'>
        {drafts.length > 0 ? (
          <>
            {drafts.map(draft => (
              <div
                key={draft.id}
                className='w-full flex flex-col bg-card p-4 border rounded-xl transition-all duration-500 hover:border-primary'>
                <div className='w-fit bg-background capitalize py-2 px-4 rounded-lg mb-3'>
                  {draft.type}
                </div>

                <p className='line-clamp-5'> {draft.content} </p>

                <div className='w-full flex items-center gap-4 mt-4'>
                  <Button variant='destructive'>
                    <Trash /> Delete
                  </Button>

                  <Button variant='outline'>
                    <PencilLine /> Edit
                  </Button>
                </div>
              </div>
            ))}

            <Link
              href='/drafts'
              className='w-full flex items-center justify-center text-ring mt-2'>
              View all
            </Link>
          </>
        ) : (
          <NoDataCard
            title='No drafts saved'
            message={`You don't have any currently saved draft`}
          />
        )}
      </div>
    </div>
  );
};

export default RecentDrafts;
