import { INewUser } from '@/types'
import {
    useQuery,
    useQueryClient,
    useMutation,
    useInfiniteQuery,
} from '@tanstack/react-query'
import { createUserAccount, signInAccount } from '../appwrite/api'


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