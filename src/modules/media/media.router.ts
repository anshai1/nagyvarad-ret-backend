import * as MC from './media.controller'
import express, {NextFunction, Request, Response} from 'express'
import { ApiResponse } from '../../common/api_response'
import { GetAlbumsRS } from '../../common/resposne/get_albums.response'
import { GetAlbumContentRS } from '../../common/resposne/get_album_content.response'

// export type CREATE_ALBUM_RQ = CreateAlbumRQ;
// export type CREATE_ALBUM_RS = ApiResponse<CreateAlbumRS>;
// export type DELETE_ALBUM_RQ = DeleteAlbumRQ;
// export type DELETE_ALBUM_RS = ApiResponse<DeleteAlbumRS>;
// export type RENAME_ALBUM_RQ = RenameAlbumRQ;
// export type RENAME_ALBUM_RS = ApiResponse<RenameAlbumRS>;
export type GET_ALBUMS_RS = ApiResponse<GetAlbumsRS>;
export type GET_ALBUM_CONTENT_RS = ApiResponse<GetAlbumContentRS>;

export default express.Router()
  .get('/getAlbums', (
    req: Request,
    res: Response<GET_ALBUMS_RS>,
    next: NextFunction) => MC.get_albums(req, res, next))
  .get('/getAlbumContent', (
    req: Request,
    res: Response<GET_ALBUM_CONTENT_RS>,
    next: NextFunction) => MC.get_album_content(req, res, next))
// .post('/createAlbum', (
//     req: Request<any, CREATE_ALBUM_RS, CREATE_ALBUM_RQ, {}, {}>,
//     res: Response<CREATE_ALBUM_RS>,
//     next: NextFunction) => MC.create_album(req, res, next))
// .post('/deleteAlbum', (
//     req: Request<any, DELETE_ALBUM_RS, DELETE_ALBUM_RQ, {}, {}>,
//     res: Response<DELETE_ALBUM_RS>,
//     next: NextFunction) => MC.delete_album(req, res, next))
// .post('/renameAlbum', (
//     req: Request<any, RENAME_ALBUM_RS, RENAME_ALBUM_RQ, {}, {}>,
//     res: Response<RENAME_ALBUM_RS>,
//     next: NextFunction) => MC.rename_album(req, res, next))
