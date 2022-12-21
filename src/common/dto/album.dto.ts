export class AlbumDTO {
  constructor(
    public id: string,
    public name: string,
    public cover_photo: string,
    public num_of_photos: number,
    public num_of_videos: number,
  ) {
  }
}