﻿using System;
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
            _tempFolder = "\\images\\";
            _awsService = awsService;
        }

        public async Task<string> GetFileURL(string id, FileType type)
        {
            //Your code here;
            var imgUrl = "";
            if (id != null && type == FileType.ProfilePhoto)
            {
                imgUrl = "https://talentprofilemodule1.azurewebsites.net/images/" + id;
            }
            return imgUrl;
        }

        public async Task<string> SaveFile(IFormFile file, FileType type)
        {
            // unique file name
            var newFileName = "";
            string pathWeb = "";
            pathWeb = _environment.WebRootPath;

            if (file != null && type == FileType.ProfilePhoto && pathWeb != "")
            {
                string pathValue = pathWeb + _tempFolder;
                newFileName = $@"{DateTime.Now.Ticks}_" + file.FileName;
                var path = pathValue + newFileName;
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
            }
            return newFileName;
        }

        public async Task<bool> DeleteFile(string id, FileType type)
        {
            //Your code here;
            var isDelete = false;
            string pathWeb = _environment.WebRootPath;
            if (id != null && type == FileType.ProfilePhoto)
            {
                string Urlpath = pathWeb + _tempFolder;
                var imgUrl = Urlpath + id;
                File.Delete(imgUrl);
                isDelete = true;

            }
            return isDelete;
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