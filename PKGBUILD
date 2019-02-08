# Maintainer: Mathias <youremail@domain.com>
pkgname=nobel-iot
_projectname=nobeliot
pkgver=1
pkgrel=1
pkgdesc="Webpage for controlling nobel-mediacontrol"
arch=('x86_64' 'i686')
url="nobelnet.dk"
license=('unknown')
#depends=('nobel-mediacontrol' 'npm' 'nodejs')
depends=('npm' 'nodejs')
source=(git://github.com/Gamped/Nobel_IoT.git)
md5sums=('SKIP')

build() {
  cd $srcdir/$backend
  npm install
  
  cd $srcdir/$frontend
  npm install 
}

package() {}