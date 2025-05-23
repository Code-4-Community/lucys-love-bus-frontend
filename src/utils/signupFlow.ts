import { message } from 'antd';
import { RcFile } from 'antd/lib/upload';

export const participatingFamilySearchQueryFlag = 'pf';
export const participatingFamilySearchQuery = `?${participatingFamilySearchQueryFlag}=true`;

export function validateImage(file: RcFile): boolean {
  // 1 MB, elastic beanstalk request size limit
  if (file.size >= 1024 * 1024) {
    message.error('Uploaded image must be smaller than 1 megabyte!');
    return true;
  }
  return false;
}
