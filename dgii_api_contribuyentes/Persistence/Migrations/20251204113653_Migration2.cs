using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Migration2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Lastname",
                table: "contribuyentes",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "contribuyentes",
                newName: "FistName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "contribuyentes",
                newName: "Lastname");

            migrationBuilder.RenameColumn(
                name: "FistName",
                table: "contribuyentes",
                newName: "Name");
        }
    }
}
