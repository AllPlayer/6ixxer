using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Visitors : System.Web.UI.Page
{
    Class_Admin visitors = new Class_Admin();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            bindgrid();
        }
    }
    private void bindgrid()
    {
       
            visitors.GetAllVisitors();
            if (visitors.OperationStatus)
            {
                DataTable dt = visitors.admintable;
                grid_visitor.DataSource = dt;
                grid_visitor.DataBind();
            }
           

        
        
    }
}