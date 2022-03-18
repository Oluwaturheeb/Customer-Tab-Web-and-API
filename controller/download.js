import path from 'path';
import {download as appDownload, field} from '../db.js';

export const downloadPage = async (req, res) => {
  let count = await appDownload.get();
  count = count.docs.map(data => data.data());
  console.log(count)
  return res.render('download', count[0]);
};

export const download = async (req, res) => {
  res.setHeader('content-type', 'application/vnd.android.package-archive');
  res.setHeader('content-disposition', 'attachment;filename=Customers Tab.apk');
  let index = str => {
    let dev = req.params.dev;
    if (dev.indexOf(str) === -1)
      return false;
    else
      return true;
  }
  
  const file = apk => {
    let app;
    switch (apk) {
      case 1:
        app = 'app-arm64-v8a-release.apk';
        break;
      case 2:
          app = 'app-armeabi-v7a-release.apk';
          break;
      case 3:
          app = 'app-x86_64-release.apk';
          break;
      case 4:
          app = 'app-x86-release.apk';
    }
    
    return path.join(path.resolve() + '/public/assets/app/' + app);
  }
  
  await appDownload.doc('downloadCount').update({count: field.increment(1)});
  
  if (index('armv8'))
    res.download(file(1));
  else if (index('armv7'))
    res.download(file(2));
  else if (index('64'))
    res.download(file(3));
  else
    res.download(file(4));
};