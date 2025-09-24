import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { toast } from "@/hooks/use-toast"
import { newUserPayload } from "@/api/allusers/types"
import { useNavigate } from "react-router-dom"
import api from "@/api"
 
const formSchema = z.object({
  username: z.string().min(2, 'Username is required').max(50, 'Username is too long'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address is required'),
})


 
const SignUpView = () => {
  const navigate = useNavigate()

  const {mutate: addUser} = api.user.addNewUser.useMutation({
    onSuccess:() => {
      toast({
      title: "Adding New User",
      description: "Signup Successful",
      
    })
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      phone: "",
      address: "",
    },
  })
  


  function onSubmit(values: z.infer<typeof formSchema>) {
    const newUser: newUserPayload = {
      userName: values.username,
      userPassword: values.password,
      userEmail: values.email,
      userPhone: values.phone,
      userAddress: values.address
    };
    addUser(newUser)
    navigate('/', {replace:true})
  }

  return (
    <div className="flex justify-center items-start mt-10 r min-h-screen">
    <div className="w-full max-w-md bg-indigo-100 p-6 mt-5 rounded-lg shadow-lg">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Enter Phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        
        <Button type="submit" className="w-full mt-3">Sign Up</Button>
        <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Don't have an account?
          <Link to="/auth/login" className="text-black">Login</Link>
        </p>
      </div>
      </form>
    </Form>
    </div>
    </div>
  )
}

export default SignUpView