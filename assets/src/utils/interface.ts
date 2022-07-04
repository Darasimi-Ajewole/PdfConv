export interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}

export interface FileUploadResponse {
  readonly blobName: string;
}

export interface SessionData {
  readonly upload_url: string;
  readonly blob_name: string;
}

export interface StartUploadSessionResponse {
  readonly sessionData: SessionData;
  readonly status: number;
}

export interface StartConvertSesssionResponse {
  readonly taskStatusId: string;
}
