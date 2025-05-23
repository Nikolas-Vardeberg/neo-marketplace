"use client"

import { cn } from "@/lib/utils";
import { registerSchema } from "@/modules/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Poppins } from "next/font/google";
import { toast } from "sonner";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"]
})

export const SignUpView = () => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();
    
    const register = useMutation(trpc.auth.register.mutationOptions({
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: async() => {
            await queryClient.invalidateQueries(trpc.auth.session.queryFilter());        
            router.push("/");
        }
    }));

    const form = useForm<z.infer<typeof registerSchema>>({
        mode: "all",
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
        }
    })

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        register.mutate(values);
    }

    const username = form.watch("username");
    const usernameErrors = form.formState.errors.username;

    const showPreview = username && !usernameErrors;

    return(
        <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 p-4 lg:p-16">
                        <div className="flex items-center justify-between mb-8">
                            <Link href="/">
                                <span className={cn("text-2xl font-semibold", poppins.className)}>
                                    Neo
                                </span>
                            </Link>
                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="text-base border-none underline"
                            >
                                <Link prefetch href="/sign-in">
                                    Sign in
                                </Link>
                            </Button>                            
                        </div>
                        <h1 className="text-4xl font-medium">
                            Join over 1,123 creators earning money on Neo.
                        </h1>
                        <FormField
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription className={cn("hidden", showPreview && "block")}>
                                        Your store will be available at&nbsp;
                                        <strong>{username}</strong>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button 
                            type="submit"
                            size="lg"
                            variant="elevated"
                            disabled={register.isPending}
                            className="bg-black text-white hover:bg-pink-400 hover:text-primary"
                        >
                            Create account
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="h-screen w-full lg:col-span-2 hidden lg:block" style={{ backgroundImage: "url('/auth-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        </div>
    )
}