const packager = require('electron-packager')
const TaskLogger = require('./TaskLogger')
const path = require('path')
const { ROOT_PATH } = require('./constants')
const { rebuild } = require('electron-rebuild')
const { serialHooks } = require('electron-packager/hooks')

const PLATFORM_ARCHES = {
  darwin: ['x64'],
  linux: ['x64', 'ia32'],
  win32: ['x64', 'ia32']
}

class ElectronBuilder {

  /**
  * @return the string that defines the items to ignore
  */
  static packagerIgnoreString (platform, arch) {
    const ignores = [
      // Folders
      '/assets',
      '/github_images',
      '/node_modules',
      '/release',
      '/src',
      '/packager',
      '/dist',

      // Files
      '/.editorconfig',
      '/.gitignore',
      '/.travis.yml',
      '/.LICENSE',
      '/.npm-debug.log',
      '/packager.js',
      '/README.md',
      '/webpack.config.js',

      // Output folders
      '/openWMail-linux-ia32',
      '/openWMail-linux-x64',
      '/openWMail-win32-ia32',
      '/openWMail-win32-x64',
      '/openWMail-darwin-x64'
    ]

    return '^(' + ignores.join('|') + ')'
  }

  /**
  * Packages a single platform and arch
  * @param platform: the platform string
  * @param arch: the arch
  * @param pkg: the package to build for
  * @return promise
  */
  static packageSinglePlatformArch (platform, arch, pkg) {
    return new Promise((resolve, reject) => {
      packager({
        dir: ROOT_PATH,
        name: 'openWMail',
        platform: platform,
        arch: arch,
        version: pkg.dependencies['electron-prebuilt'],
        'app-bundle-id': 'openwmail.openwmail',
        'app-version': pkg.version,
        'app-copyright': 'Copyright ' + pkg.author + '(' + pkg.license + ' License)',
        icon: path.join(ROOT_PATH, 'assets/icons/app'),
        overwrite: true,
        asar: true,
        prune: false,
        'version-string': {
          CompanyName: pkg.author,
          FileDescription: pkg.description,
          OriginalFilename: pkg.name,
          ProductName: 'openWMail'
        },
        'extend-info': {
          'CFBundleURLSchemes': ['mailto']
        },
        ignore: ElectronBuilder.packagerIgnoreString(platform, arch),
        tmpdir: false,
        afterCopy: [serialHooks([
          (buildPath, electronVersion, platform, arch) => {
            const buildNativePath = path.join(buildPath, 'bin/app')
            rebuild({ buildNativePath, electronVersion, arch })
          }
        ])]
      }, function (err, appPath) {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  /**
  * Pacakges the electron app
  * @param platforms: the platforms to package for
  * @param pkg: the package to read version etc from
  * @return promise on completion
  */
  static packageApp (platforms, pkg) {
    const task = TaskLogger.start('Package Electron')
    const tasks = platforms.reduce((acc, platform) => {
      return acc.concat(PLATFORM_ARCHES[platform].map((arch) => {
        return { platform: platform, arch: arch }
      }))
    }, [])

    return Promise.resolve()
      .then(() => {
        return tasks.reduce((acc, { platform, arch }) => {
          return acc.then(() => ElectronBuilder.packageSinglePlatformArch(platform, arch, pkg))
        }, Promise.resolve())
      })
      .then(() => task.finish(), (err) => task.fail(err))
  }
}

module.exports = ElectronBuilder
