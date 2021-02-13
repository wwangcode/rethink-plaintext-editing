import fs from 'fs'
import path from 'path'


export default async (req, res) => {
  console.log(req.body)
  const absolutePath = path.resolve('exports')
  console.log(absolutePath)
  const { name, type, lastModified, text } = req.body
  fs.writeFile(`${absolutePath}${name}`, text, 'utf8',  (err) => {
    if (err) {
        return res.status(400).json({
          error: 'There was an error exporting file, please try again'
        })
    }
  })
  return res.status(200).json({
    exportPath: absolutePath
  })
}

