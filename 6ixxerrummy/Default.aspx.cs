using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        
    }
    protected void btn_Click(object sender, EventArgs e)
    {
        int Id = 0;
        string ipaddress;
        ipaddress = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
        if (ipaddress == "" || ipaddress == null)
            ipaddress = Request.ServerVariables["REMOTE_ADDR"];

        //lbl_IP.Text = ipaddress;
        //lbl_Date.Text = DateTime.Now.ToString();
        string constr = ConfigurationManager.ConnectionStrings["connectionstring"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand("Insert_Visitor"))
            {
                using (SqlDataAdapter sda = new SqlDataAdapter())
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@IPAddress", ipaddress);
                    cmd.Parameters.AddWithValue("@DateTime", DateTime.Now.ToLongDateString());
                    cmd.Connection = con;
                    con.Open();
                    Id = Convert.ToInt32(cmd.ExecuteScalar());
                    con.Close();

                }
            }

        }

        //Response.ContentType = "Application/apk";
        //Response.AppendHeader("Content-Disposition", "attachment; filename=6ixxerRummy.apk");
        Response.Redirect("https://www.6ixxerrummy.com/6ixxerRummy.apk");
        //Response.End();
    }
}