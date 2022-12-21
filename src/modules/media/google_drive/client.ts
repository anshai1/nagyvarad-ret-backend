import {OAuth2Client} from "google-auth-library";
import {pipe} from "fp-ts/lib/function";
import {isSome, match, none, Option, some} from "fp-ts/Option";
import path from 'path';
import process from 'process';
import {authenticate} from '@google-cloud/local-auth';
import {drive_v3, google} from 'googleapis';
import {promises as fs} from "fs";
import Drive = drive_v3.Drive;
import {GD_MIME_TYPE} from "./mime_types";

// API DOCS:
// https://googleapis.dev/nodejs/googleapis/latest/drive/classes/Resource$Files-1.html#list
// https://developers.google.com/drive/api/v3/reference/files
// https://developers.google.com/drive/api/guides/ref-search-terms#operators

export class Client {
  // If modifying these scopes, delete token.json.
  private SCOPES = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.metadata',
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/drive.photos.readonly',
    'https://www.googleapis.com/auth/drive.readonly',
  ]
  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.
  private TOKEN_PATH = path.join(process.cwd(), 'token.json')
  private CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json')

  private CLIENT: Option<Drive> = none
  private CLIENT_ERROR: any = null

  constructor() {
    this.get_drive_client()
      .then(client => this.CLIENT = some(client))
      .catch(err => {
        this.CLIENT_ERROR = err
        this.CLIENT = none
      })
  }

  private get client(): Drive {
    if (isSome(this.CLIENT)) {
      return this.CLIENT.value
    }
    throw new Error("Google drive client not available")
  }

  // Reads previously authorized credentials from the saved file.
  private load_saved_credentials = async (): Promise<Option<OAuth2Client>> => {
    try {
      return pipe(
        await fs.readFile(this.TOKEN_PATH),
        content => JSON.parse(content.toString()),
        credentials => google.auth.fromJSON(credentials) as OAuth2Client,
        client => some(client)
      )
    } catch (err) {
      return none
    }
  }

  // Serializes credentials to a file comptible with GoogleAUth.fromJSON.
  private save_credentials = async (client: any): Promise<void> => {
    return pipe(
      await fs.readFile(this.CREDENTIALS_PATH),
      content => JSON.parse(content.toString()),
      keys => keys.installed || keys.web,
      key => JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
      }),
      payload => fs.writeFile(this.TOKEN_PATH, payload)
    )
  }

  // Load or request authorization to call APIs.
  private authorize = async (): Promise<OAuth2Client> => {
    return pipe(
      await this.load_saved_credentials(),
      match(
        (): Promise<OAuth2Client> => this.authenticate_and_save_credentials(),
        (client: OAuth2Client): Promise<OAuth2Client> => Promise.resolve(client)
      ),
    )
  }

  private authenticate_and_save_credentials = async (): Promise<OAuth2Client> => {
    const client: OAuth2Client = await authenticate({
      scopes: this.SCOPES,
      keyfilePath: this.CREDENTIALS_PATH,
    })
    if (client.credentials) {
      await this.save_credentials(client)
    }
    return Promise.resolve(client)
  }

  // Load the authorized object that can be used to call APIs.
  private get_drive_client = async (): Promise<Drive> =>
    pipe(
      await this.authorize(),
      client => google.drive({version: 'v3', auth: client}))


  private find_folder_by_name = async (folder_name: string) => {
    const request_params = {
      pageSize: 1,
      fields: 'nextPageToken, files(id, name, mimeType)',
      q: `mimeType=\'${GD_MIME_TYPE.GOOGLE_DRIVE_FOLDER}\' and name contains '${folder_name}'`
    }
    const response: any = await this.client.files.list(request_params)
    const searched_folder = response.data?.files?.find((folder: any) => folder.name === folder_name)
    if (searched_folder) return searched_folder;
    return null;
  }

  public get_all_albums = async () => {
    const root_folder = await this.find_folder_by_name("nr_web_albums_root")
    return await this.client.files.list({
      pageSize: 50,
      fields: 'nextPageToken, files(id, name, mimeType)',
      q: `'${root_folder.id}' in parents and
                 trashed = false and
                 mimeType = \'${GD_MIME_TYPE.GOOGLE_DRIVE_FOLDER}\'`
    })
  }

  public get_photos_by_album = async (album_name: string) => {
    const root_folder = await this.find_folder_by_name(album_name)
    return await this.client.files.list({
      pageSize: 50,
      fields: 'nextPageToken, files(id, name, mimeType, webViewLink)',
      q: `'${root_folder.id}' in parents and
                 trashed = false`
    })
  }
}
