const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
// localfile ke handler function likhna hai

exports.localFileUpload = async (req, res) => {
  try {
    //file fetch from request
    //ye .file jo req.files.file me hai na usse hi ham postman ke form data me key ki tarah use krenge
    const file = req.files.file;
    console.log(file);
    //create path to store file needs to be stored on server
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    // add path to the move function
    file.mv(path, (err) => {
      console.log(err);
    });
    // create a successful response
    res.json({
      success: true,
      message: "local file upload successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

function isFileTypeSupported(type, supportedType) {
  //here .includes check that type is in supported type
  return supportedType.includes(type);
}

async function CloudinaryUploadFile(file, folder) {
  const options = {
    folder: folder,
  };

  console.log("temp file path", file.tempFilePath);

  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;

    //validation

    const supportedType = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedType)) {
      return res.Status(400).json({
        success: false,
        message: "file formate does not support",
      });
    }

    //file formate is supported

    const response = await CloudinaryUploadFile(file, "Sample_file_upload");

    console.log("this is response", response);

    //db me entry save krna ahi

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "image uploaded successfully",
    });
  } catch (err) {
    console.log(err);
    console.log("error in uploading in cloudinary");
  }
};

exports.VideoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const videoFile = req.files.videoFile;

    // validation of video

    const VideoType = ["mp4"];
    const VideofileType = videoFile.name.split(".")[1].toLowerCase();

    if (VideoType != VideofileType) {
      return res.Status(400).json({
        success: false,
        message: "file formate does not support",
      });
    }
    
  } catch (e) {}
};
