exports.addMusic = (req, res) => {
    const {id: userId} = res.userData
    req.file.filename //nama file musiknya
}

exports.playList = (req,res) => {
    const {id: userId} = res.userData
}
