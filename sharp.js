const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'dist');

if(!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
}

fs.readdirSync(target)
.forEach(image => {
    //mengubah ukuran gambar dekstop
    sharp(`${target}/hero-image_2.jpg`)
    .resize(1200)
    .jpeg({
        quality: 80,
        progressive: true,
        force: true,
    })
    .toFile(path.resolve(__dirname,`${destination}/${image.split('.').slice(0,-1).join('.')}-large.jpg`),
);

    //mengubah ukuran gambar mobile
    sharp(`${target}/hero-image_2.jpg`)
    .resize(600)
    .jpeg({
        quality: 80,
        progressive: true,
        force: true,
    })
    .toFile(path.resolve(__dirname, `${destination}/${image.split('.').slice(0,-1).join('.')}-small.jpg`),
);
});
