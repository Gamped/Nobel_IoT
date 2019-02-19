# NOTE: This will only create a package for the backend
# the REACT frontend need to be served seperately

# Maintainer: Mathias <youremail@domain.com>
pkgname=nobel-remote
PROJECTNAME=nobelremote
BACKEND=$PROJECTNAME/backend
FRONTEND=$PROJECTNAME/frontend
pkgver=1
pkgrel=1
pkgdesc="Webpage for controlling nobel-mediacontrol"
arch=('x86_64' 'i686')
url="nobelnet.dk"
license=('GPL-3.0')
#depends=('nobel-mediacontrol' 'npm' 'nodejs')
depends=('npm' 'nodejs')
source=(git://github.com/Gamped/Nobel_IoT.git)
md5sums=('SKIP')

build() {
  cd $srcdir/backend
  npm install dbus
  npm install socketio
}

package() {
  cd $srcdir/$BACKEND
  install -D -m644 NobelIoTServer.js "${pkgdir}"/usr/lib/nobel-remote/backend/NobelRemoteServer.js
  # <<< WIP: Install folder with NPM packages >>>
}