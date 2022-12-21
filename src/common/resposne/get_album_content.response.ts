import { PhotoDTO } from '../dto/photo.dto'

export class GetAlbumContentRS {
  constructor(
    public photos: Array<PhotoDTO>
  ) {
  }
}