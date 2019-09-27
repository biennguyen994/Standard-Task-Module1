using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Talent.Common.Aws;
using Talent.Common.Contracts;

namespace Talent.Common.Services
{
    public class FileService : IFileService
    {
        private readonly IHostingEnvironment _environment;
        private readonly string _tempFolder;
        private IAwsService _awsService;

        public FileService(IHostingEnvironment environment, 
            IAwsService awsService)
        {
            _environment = environment;
            _tempFolder = "//images//";
            _awsService = awsService;
        }


         public async Task<string> GetFileURL(string id, FileType type)
        {
            var imageUrl = "";
            string Webpath = "https://talentprofilemodule1.azurewebsites.net/images/";

            if (id != null && type == FileType.ProfilePhoto)
            {
                imageUrl = Webpath + id;
            }
            return imageUrl;
        }

        public async Task<string> SaveFile(IFormFile file, FileType type)
        {
            var myImageFile = "";
            string Webpath = _environment.ContentRootPath;

            if (file != null && type == FileType.ProfilePhoto && Webpath != "")
            {
                string directoryPath = Webpath + _tempFolder;
                myImageFile = $@"{DateTime.Now.Ticks}_" + file.FileName;
                var newPath = directoryPath + myImageFile;
                using (var fileStream = new FileStream(newPath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
            }
           
            return myImageFile;
            

        }

        public async Task<bool> DeleteFile(string id, FileType type)
        {
            var isTrue = false;
            string Webpath = _environment.ContentRootPath;
            if (id != null && type == FileType.ProfilePhoto)
            {
                string pathString = Webpath + _tempFolder;
                var fileUrl = pathString + id;
                File.Delete(fileUrl);
                isTrue = true;

            }
            return isTrue;
        }



        #region Document Save Methods

        private async Task<string> SaveFileGeneral(IFormFile file, string bucket, string folder, bool isPublic)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        
        private async Task<bool> DeleteFileGeneral(string id, string bucket)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        #endregion
    }
}
