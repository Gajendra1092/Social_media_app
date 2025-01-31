import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "../ui/form" 
import { z } from "zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const PostForm = ({post}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <Textarea className="shad-textarea custom-scrollbar" placeholder="Write your Caption here.">
              </Textarea>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FileUploader 
              fieldChange={field.onChange}
              mediaUrl = {post?.imageUrl}
              />
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" />
              </FormControl>
              
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Tags (sperated by comma " , ")</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" placeholder="Art, Expression, Learn"/>
              </FormControl>
              <FormMessage className="shad-form_message"/>
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
        <Button type="button" className="shad-button-dark_4">Cancel</Button>
        <Button type="submit" className="shad-button_primary whitespace-nowrap">Submit</Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm
