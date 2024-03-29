import { File } from "./interface";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB
const VALID_MIMETYPE = [
  "text/csv",
  "application/csv",
  "application/json",
  "text/plain",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/html",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/rtf",
  "text/plain",
  "text/rtf",
];

export const validateFileSize = (file: File): boolean =>
  file.size < MAX_FILE_SIZE;

export const validateMimeType = (file: File): boolean =>
  VALID_MIMETYPE.includes(file.type);

const validateFile = (file: File): boolean =>
  validateFileSize(file) && validateMimeType(file);

export default validateFile;
