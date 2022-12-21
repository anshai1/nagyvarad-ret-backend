import express from 'express'
import { Request, Response } from 'express'
import * as UC from './user.controller'
import { ApiResponse } from '../../common/api_response'
import { GetAllUsersRS } from '../../common/resposne/get_all_users.response'
import { CreateUserRS } from '../../common/resposne/create_user.response'
import { CreateUserRQ } from '../../common/request/create_user.request'
import { DeleteUserRS } from '../../common/resposne/delete_user.response'
import { EmptyRS } from '../../common/resposne/_empty.response'

export type GET_ALL_USERS_RQ = Request<{}, ApiResponse<GetAllUsersRS | EmptyRS>, {}, {}, {}>
export type GET_ALL_USERS_RS = Response<ApiResponse<GetAllUsersRS | EmptyRS>, {}>

export type CREATE_USER_RQ = Request<{}, ApiResponse<CreateUserRS | EmptyRS>, CreateUserRQ, {}, {}>
export type CREATE_USER_RS = Response<ApiResponse<CreateUserRS | EmptyRS>, {}>

export type DELETE_USER_RQ = Request<{user_id: string}, ApiResponse<DeleteUserRS | EmptyRS>, {}, {}, {}>
export type DELETE_USER_RS = Response<ApiResponse<DeleteUserRS | EmptyRS>, {}>

export default express.Router()
  // TODO: these should be authorized
  .get('/getAllUsers', (req: GET_ALL_USERS_RQ, res: GET_ALL_USERS_RS) =>
    UC.get_all_users(req, res))
  .post('/createUser', (req: CREATE_USER_RQ, res: CREATE_USER_RS) =>
    UC.create_user(req, res))
  .delete('/deleteUser/:user_id', (req: DELETE_USER_RQ, res: DELETE_USER_RS) =>
    UC.delete_user(req, res))