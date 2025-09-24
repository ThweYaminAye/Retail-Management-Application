"use client"
 
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
import { Link, useNavigate } from "react-router-dom"
import { loginMutation } from "@/api/auth/queries"
import useAuth from "@/hooks/useAuth"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

 
const formSchema = z.object({
    userName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
    userPassword: z.string().min(4),
})


const LoginView = () => {

  const {userLogin}=  useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const {toast} = useToast()
  
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      userPassword: ""
    },
  })

  const { mutate: loginUser } = loginMutation.useMutation({
		
		onSuccess: (data) => {
      console.log("Generating token ok")
			userLogin(data.token)
			navigate("/", { replace: true })

      toast({
				title: `You logged in with the following email: ${
					form.getValues().userName
				}`,
				description: "Successful login",
				
			})
		},
    onError: (error) => {
			console.error("Error during login:", error)
      setError("Username and password do not match")
			toast({
				title: `Login fail!`,
				description:
					"An error occurred during login. Please try again.",
				variant: "destructive",
			})
		},
	})
  
  function onSubmit(data: z.infer<typeof formSchema>) {
    setError(null)
    loginUser(data)
    console.log(data)
  }
  return (
    <div className="login-container">
      <div className="flex justify-center items-start mt-20 r min-h-screen">
      <div className="w-full max-w-md bg-indigo-100 p-6 mt-5 rounded-lg shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="userPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
                <div className="text-red-500 text-sm text-center mt-4">{error}</div>
          )}
          
          <Button type="submit" className="w-full">Login</Button>
          <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?
            <Link to="/auth/signup" className="text-black">Register here</Link>
          </p>
        </div>
        </form>
      </Form>
      </div>
      </div>
    </div>
  )
}

export default LoginView