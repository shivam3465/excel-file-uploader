import multer from "multer";

const storage= multer.diskStorage({
    //specifying the folder in which file needed to be uploaded
    destination: (req,file,cb)=>{
        cb(null,'./uploads');
    },

    //specifying the file name , which is a combination of of current time and original filename
    filename: (req,file,cb)=>{        
        cb(null,Date.now()+'_'+file.originalname);
    }
})

//creating the upload for handling the uploads
const upload= multer({storage})

//exporting this custom fileUpload middleware 
export const fileUploaderHandler= upload.single('file');