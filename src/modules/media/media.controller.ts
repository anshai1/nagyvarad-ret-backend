import {NextFunction, Request, Response} from "express";
import * as MS from './media.service'
import { ApiResponse } from '../../common/api_response'
import { AlbumDTO } from '../../common/dto/album.dto'
import { ApiError } from '../../common/api_error'
import { PhotoDTO } from '../../common/dto/photo.dto'

// create a folder on google-drive
// with a given name
// [] name should be unique therefor we could do other operations based on it like deletion, rename
// [] should be authorized
// [] check whether it already exists
// export async function create_album(req: Request<any, any, CREATE_ALBUM_RQ, {}, {}>,
//                                    res: Response<any>,
//                                    next: NextFunction): Promise<void> {
//
// }

// delete an album by ID // Name
// [] delete all the items inside the album
// [] should be authorized
// export async function delete_album(req: Request<any, DELETE_ALBUM_RS, DELETE_ALBUM_RQ, {}, {}>,
//                                    res: Response<DELETE_ALBUM_RS>,
//                                    next: NextFunction): Promise<void> {
//
// }

// rename the folder associated to the given album
// [] should be authorized
// export async function rename_album(req: Request<any, RENAME_ALBUM_RS, RENAME_ALBUM_RQ, {}, {}>,
//                                    res: Response<RENAME_ALBUM_RS>,
//                                    next: NextFunction) {
//
// }

// will return a list with albums
// authorization NOT needed
export async function get_albums(req: Request,
                                 res: Response<any>,
                                 next: NextFunction) {
 MS.get_all_albums()
    .then(albums => res.send(ApiResponse.for_success(albums.data.files?.map(album => new AlbumDTO(album.id || '', album.name || '', '', 0, 0)))))
    .catch(error => res.send(ApiResponse.for_failure([new ApiError('UNEXPECTED_ERROR', error.message)])))
}

// will return an album with a list of photos and a list of videos
// {
//   album: AlbumDTO,
//   photos: Array<PhotoDTO>
//   videos: Array<VideoDTO>
// }
export async function get_album_content(req: Request,
                                        res: Response<any>,
                                        next: NextFunction) {
  MS.get_photos_by_album(req.query?.name as string)
    .then(albums => res.send(ApiResponse.for_success(albums.data.files?.map(photo => new PhotoDTO(photo.id || '', photo.name || '')))))
    .catch(error => res.send(ApiResponse.for_failure([new ApiError('UNEXPECTED_ERROR', error.message)])))

}

// upload a photo to google-drive
// with a given name to a given album
// [] check if the album exists
export async function upload_photo() {}

// delete a given photo from google-drive by ID / name
// [] should be authorized
export async function delete_photo() {}

// upload a photo to google-drive
// with a given name to a given album
// [] check if the album exists
export async function upload_video() {}

// delete a specific video from google-drive by ID / name
// [] should be authorized
export async function delete_vide() {}
