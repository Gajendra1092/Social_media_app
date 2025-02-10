import { INewPost, INewUser } from '@/types'
import {
    useQuery,
    useQueryClient,
    useMutation,
    useInfiniteQuery,
} from '@tanstack/react-query'
import { createUserAccount, getRecentPosts, signInAccount, signOutAccount } from '../appwrite/api'
import { QUERY_KEYS } from './queryKeys'
import { createPost } from '../appwrite/api'


export const useCreateAccountMutation = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
} // this is custom hook (useCreateAccountMutation) and useMutation is a React Query hook for handling write operations.
// Specifies the function (createUserAccount) that will be called when the mutation is triggered. It accepts an object (user) of type INewUser as input.

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email:string; 
            password:string
    }) => signInAccount(user),
    });
} // useMutation is a React Query hook for handling write operations.


export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount,
    });
} 


export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  };

export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: () => getRecentPosts,
    });
}  