using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlTypes;
using System.Net.Mime;
using Newtonsoft.Json;
using PamServices;

namespace PamApi.Controllers;

[Route("")]
public class ApiController : ControllerBase
{
    private readonly LabelService _labelService;
    private readonly StorageService _storageService;
    private readonly ImageService _imageService;

    /// <summary>
    /// Constructor for the controller, uses dependency injection to get the services needed.
    /// </summary>
    /// <param name="storageService">The injected image service.</param>
    /// <param name="labelService">the injected label service.</param>
    /// <param name="imageService">the injected image service.</param>
    public ApiController(StorageService storageService, LabelService labelService, ImageService imageService)
    {
        _storageService = storageService;
        _labelService = labelService;
        _imageService = imageService;
    }

    // PUT /upload
    [HttpPut("upload")]
    public async Task<IActionResult> Upload()
    {
        var rawRequestBody = await new StreamReader(Request.Body).ReadToEndAsync();
        var uploadRequest =
            JsonConvert.DeserializeObject<UploadRequest>(rawRequestBody);

        var uploadBucketName = Environment.GetEnvironmentVariable("STORAGE_BUCKET_NAME");

        var presignedUrl = _storageService.GetPresignedUrlForImage(uploadRequest.file_name, uploadBucketName!);

        //var preSignedUrlResponse = _amazonS3.GetPreSignedURL(
        //    new GetPreSignedUrlRequest()
        //    {
        //        BucketName = uploadBucketName,
        //        Key = uniqueFileName,
        //        ContentType = "image/jpeg",
        //        Expires = DateTime.UtcNow.AddMinutes(5),
        //        Verb = HttpVerb.PUT
        //    });

        var response = new UploadResponse() { url = presignedUrl };
        return Ok(response);
    }

    // GET /labels
    [HttpGet("labels")]
    public async Task<IActionResult> Get()
    {
        var allLabels = await _labelService.GetAllItems();
        var response = new LabelsResponse(allLabels.ToList());
        return Ok(response);
    }

    // GET /labels old version
    [HttpGet("labelsold")]
    public IActionResult GetOld()
    {
        var response = new Dictionary<string, Dictionary<string, Dictionary<string, int>>>();
        var labels = new Dictionary<string, Dictionary<string, int>>();
        labels.Add("sunrise", new Dictionary<string, int> { { "count", 3 } });
        labels.Add("beach", new Dictionary<string, int> { { "count", 1 } });
        response.Add("labels", labels);
        return Ok(response);
    }

    // POST /download
    [HttpPost("download")]
    public IActionResult Post([FromBody] string[] labels)
    {
        return Ok();
    }

    // GET /test-insert
    [HttpGet("test-insert")]
    public async Task<IActionResult> TestInsert(string label, int count, string[] images)
    {
       await _labelService.CreateItem(new Label()
            { LabelID = label, Count = count, Images = images.ToList() });
       return Ok();
    }

    // GET /test-detect
    [HttpGet("test-detect")]
    public async Task<IActionResult> TestDetect(string bucket, string key)
    {
        var detectedLabels = await _imageService.DetectLabels(key, bucket);
        await _labelService.AddImageLabels(key, detectedLabels);
        return Ok();
    }

    // GET /test-download
    [HttpGet("test-download")]
    public async Task<IActionResult> TestDownload([FromBody] string[] labels)
    {
        var detectedLabels = await _labelService.GetAllImagesForLabels(labels);
        await _labelService.AddImageLabels(key, detectedLabels);
        return Ok();
    }
}