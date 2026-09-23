const CLOUD_NAME = 'otjnsdoc'; // remplace par ton vrai cloud name

export function getVideoUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${publicId}.mp4`;
}

export function getThumbnailUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${publicId}.jpg`;
}