using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.Rekognition;
using Amazon.S3;
using Amazon.SimpleNotificationService;
using Amazon.Util;
using Microsoft.Net.Http.Headers;
using PamServices;
using System.Reflection;

namespace PamApi;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;

        ConfigureDynamoDB();
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddAWSService<IAmazonS3>();
        services.AddAWSService<IAmazonDynamoDB>();
        services.AddAWSService<IAmazonRekognition>();
        services.AddAWSService<IAmazonSimpleNotificationService>();
        services.AddTransient<IDynamoDBContext, DynamoDBContext>();


        //services.AddTransient<IDynamoDBContext>(c => new
        //    DynamoDBContext(c.GetService<IAmazonDynamoDB>(),
        //        new DynamoDBContextConfig()));

        services.AddTransient<LabelService>();

        services.AddCors(options =>
        {
            options.AddDefaultPolicy(
                policy =>
                {
                    policy.AllowAnyOrigin().AllowAnyMethod().WithHeaders(HeaderNames.ContentType);
                });
        });
        services.AddControllers();
        services.AddSwaggerGen();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
                options.RoutePrefix = string.Empty;
            });
        }

        app.UseCors();

        app.UseHttpsRedirection();

        app.UseRouting();

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapGet("/", async context =>
            {
                await context.Response.WriteAsync("Welcome to running ASP.NET Core on AWS Lambda");
            });
        });
    }

    private void ConfigureDynamoDB()
    {
        var labelsTableName = Environment.GetEnvironmentVariable("LABELS_TABLE_NAME");
        if (labelsTableName != null)
        {
            AWSConfigsDynamoDB.Context.AddMapping(new TypeMapping(typeof(Label), labelsTableName));
        }
    }
}