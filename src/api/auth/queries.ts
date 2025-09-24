import { useMutation, UseMutationOptions } from "@tanstack/react-query"
import type { loginPayload, loginResponse } from "./types"

import authServices from "./services"

export const loginMutation = {
	useMutation: (
		opt?: UseMutationOptions<loginResponse, Error, loginPayload, void>
	) =>
		useMutation({
			mutationKey: ["login"],
			mutationFn: (payload: loginPayload) => authServices.login(payload), 
			...opt, 
		}),
}
























