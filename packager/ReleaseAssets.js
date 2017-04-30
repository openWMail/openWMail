const fs = require('fs-extra')
const path = require('path')
const { ROOT_PATH } = require('./constants')

class ReleaseAssets {

  /**
  * Copies the assets into the releases folders
  * @param platforms: the platforms to build for
  * @return promise
  */
  static copyAssetsIntoReleases (platforms) {
    const platformsSet = new Set(platforms)
    if (platformsSet.has('darwin')) {
      fs.copySync(path.join(__dirname, 'dmg/First Run.html'), path.join(ROOT_PATH, 'openWMail-darwin-x64/First Run.html'))
    }
    if (platformsSet.has('linux')) {
      fs.copySync(path.join(ROOT_PATH, 'assets/icons/app.png'), path.join(ROOT_PATH, 'openWMail-linux-ia32/icon.png'))
      fs.copySync(path.join(ROOT_PATH, 'assets/icons/app.png'), path.join(ROOT_PATH, 'openWMail-linux-x64/icon.png'))
      fs.copySync(path.join(__dirname, 'linux/openwmail.desktop'), path.join(ROOT_PATH, 'openWMail-linux-ia32/openwmail.desktop'))
      fs.copySync(path.join(__dirname, 'linux/openwmail.desktop'), path.join(ROOT_PATH, 'openWMail-linux-x64/openwmail.desktop'))
    }

    return Promise.resolve()
  }
}

module.exports = ReleaseAssets
