using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(opt =>
{
   opt.UseSqlServer(builder.Configuration.GetConnectionString("StoreConnection"));
});

builder.Services.AddControllers();


var app = builder.Build();


// Configure the HTTP request pipeline.
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
   .WithOrigins("http://localhost:4200", "https://localhost:4200"));

//app.UseHttpsRedirection();
//app.UseAuthorization();

app.MapControllers();

app.Run();
