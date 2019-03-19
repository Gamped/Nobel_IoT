# NOTE: This will only create a package for the backend
# the REACT frontend need to be served seperately

# Maintainer: Mathias
pkgname=nobel-remote

PROJECTNAME=Nobel_Remote
BACKEND=$PROJECTNAME/backend
FRONTENDBUILD=$PROJECTNAME/frontend

pkgver=1
pkgrel=1
pkgdesc="Webpage for controlling nobel-mediacontrol"
arch=('x86_64' 'i686')
url="nobelnet.dk"
license=('GPL-3.0')
depends=('nobel-mediacontrol' 'npm' 'nodejs')
source=(git://github.com/Gamped/Nobel_Remote.git)
md5sums=('SKIP')

build() {
  # Backend
  cd $srcdir/$BACKEND
  npm install dbus
  npm install socketio
}

package() {
  # Backend
  cd $srcdir/$BACKEND
  install -D -m644 NobelRemoteServer.js "${pkgdir}"/usr/lib/nobel-remote/backend/NobelRemoteServer.js
  install -D -m644 nobelRemote.service "${pkgdir}"/usr/lib/systemd/system/nobelRemote.service
  cp -r node_modules "${pkgdir}"/usr/lib/nobel-remote/backend/node_modules

  # Frontend
  cd $srcdir/$FRONTENDBUILD
  mkdir -p "${pkgdir}"/var/www
  cp -r build "${pkgdir}"/var/www/nobel-remote
}