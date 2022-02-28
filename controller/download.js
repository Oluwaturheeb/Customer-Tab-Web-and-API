import path from 'path';

export const downloadPage = (req, res) => {
  return res.render('download');
};

export const download = (req, res) => {
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
  
  if (index('armv8'))
    res.download(file(1));
  else if (index('armv7'))
    res.download(file(2));
  else if (index('64'))
    res.download(file(3));
  else
    res.download(file(4));
};