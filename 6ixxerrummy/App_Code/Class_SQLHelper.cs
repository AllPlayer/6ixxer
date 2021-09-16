using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Data.SqlClient;

/// <summary>
/// Summary description for Class_SQLHelper
/// </summary>
public class Class_SQLHelper
{
    private SqlCommand cmd = new SqlCommand();
    private SqlConnection conn;
    private bool bool_Status;
    private string str_Error;

    public Class_SQLHelper()
    {
        conn = new SqlConnection(ConfigurationManager.ConnectionStrings["connectionstring"].ToString());
    }

    protected void OpenConnection()
    {
        try
        {
            if (conn.State != ConnectionState.Open)
                conn.Open();
        }
        catch (Exception ex)
        {
            OperationStatus = false;
            ErrorMessage = "Error : " + ex.Message;
        }
    }

    protected void CloseConnection()
    {
        try
        {
            if (conn.State != ConnectionState.Closed)
                conn.Close();
        }
        catch (Exception ex)
        {
            OperationStatus = false;
            ErrorMessage = "Error : " + ex.Message;
        }
    }

    public SqlConnection Connection
    {
        get { return conn; }
    }

    public SqlCommand Command
    {
        get { return cmd; }
        set { cmd = value; }
    }

    public bool OperationStatus
    {
        get { return bool_Status; }
        set { bool_Status = value; }
    }

    public string ErrorMessage
    {
        get { return str_Error; }
        set { str_Error = value; }
    }
}
