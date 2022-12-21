import { AlbumDTO } from '../../common/dto/album.dto'
import { Client } from './google_drive/client'
import { Request, Response } from 'express'
import { ApiResponse } from '../../common/api_response'
import { ApiError } from '../../common/api_error'

const CLIENT = new Client();

// TODO: types
export async function get_all_albums()  {
 return await CLIENT.get_all_albums()
}

// TODO: types
export async function get_photos_by_album(album_name: string) {
  return await CLIENT.get_photos_by_album(album_name);
}