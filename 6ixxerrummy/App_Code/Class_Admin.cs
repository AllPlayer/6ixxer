using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

/// <summary>
/// Summary description for Class_Admin
/// </summary>
public class Class_Admin:Class_SQLHelper
{
    public string username { set; get; }
    public string password { set; get; }

    public DataTable admintable { set; get; }


    public int category_id { get; set; }
    public string category_name { get; set; }
    public string category_banner_path { get; set; }
    public string SearchText { get; set; }
    public Boolean status { get; set; }
    public Boolean featured { get; set; }




    public int distributer_id { get; set; }
    public int NewsID { get; set; }
    public string NewsDesc { get; set; }

    public string NewsTitle { get; set; }

    public string companyname { get; set; }
    public string companyaddress { get; set; }
    public string companystate { get; set; }
    public string companytelephone { get; set; }

   
    public string companymobile { get; set; }
    public string contactperson { get; set; }
    public Boolean Status { get; set; }

    public int Dist_ID { get; set; }
    public int industry_id { get; set; }
    public string companyemail { get; set; }
    public string distributionarea { get; set; }

    //public string password { get; set; }

    public string companyfax { get; set; }
    public string Dealershiparea { get; set; }

    public DataTable DealerTable { get; set; }
    public DataTable CategoryTable { get; set; }


    public string companyrating { set; get; }
    public string SortBy { set; get; }
    public DataTable SearchTable { get; set; }

    public string SPLOffer { set; get; }
    public string SPLFolder { set; get; }
    public int OfferID { get; set; }
    public string SPLOfferDesc { set; get; }
   

    public string HigSalesState { set; get; }
    public string HighSalesProduct { set; get; }
    public string HighSalesDealer { set; get; }
    public string Remark { set; get; }

    public int EmpID { get; set; }
    public string Title { set; get; }
    public string Image { set; get; }
    public string Description { set; get; }


    public int CirtificateID { get; set; }
    
   
    public string Country { set; get; }

    public int PurchaseID { get; set; }
    public string Pdf { get; set; }
    public Boolean POStatus { get; set; }

	public Class_Admin()
	{
		//
		// TODO: Add constructor logic here
		//
	}
    public void GetAllVisitors()
    {
        try
        {
            SqlDataAdapter ad = new SqlDataAdapter();
            DataTable Sqldatatable = new DataTable();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_GetAllVisitors";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            ad.SelectCommand = cmd;
            OpenConnection();
            ad.Fill(Sqldatatable);
            admintable = Sqldatatable;
            OperationStatus = true;
            CloseConnection();
            Sqldatatable.Dispose();
            cmd.Dispose();
            ad.Dispose();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }
    public void Getuserpassword()
    {
        try
        {
            DataTable Sqldatatable = new DataTable();
            SqlDataAdapter ad = new SqlDataAdapter();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "sp_checkadminValid";
            cmd.Parameters.AddWithValue("@username", username);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            ad.SelectCommand = cmd;
            OpenConnection();
            ad.Fill(Sqldatatable);
            admintable = Sqldatatable;
            OperationStatus = true;
            CloseConnection();
            Sqldatatable.Dispose();
            cmd.Dispose();
            ad.Dispose();
        }
        catch (Exception ex)
        {
            OperationStatus = false;
            ErrorMessage = "Error : " + ex.Message;
        }
    }

    public void InsertSPLOffer()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_Add_SPL_Offer";
        
            cmd.Parameters.AddWithValue("@Spl_Offer", SPLOffer);
            cmd.Parameters.AddWithValue("@Spl_folder", SPLFolder);
           
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            distributer_id = Convert.ToInt32(cmd.ExecuteScalar());
            if (distributer_id == -1)
            {
                OperationStatus = false;
                ErrorMessage = "Error : Some error found please try again.";
            }
            else
            {
                OperationStatus = true;

            }
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }


    public void InsertNews()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_InsertNews";

            cmd.Parameters.AddWithValue("@NewsTitle", NewsTitle);
            cmd.Parameters.AddWithValue("@NewsDesc", NewsDesc);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            NewsID = Convert.ToInt32(cmd.ExecuteScalar());
            if (NewsID == -1)
            {
                OperationStatus = false;
                ErrorMessage = "Error : Some error found please try again.";
            }
            else
            {
                OperationStatus = true;

            }
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }

    public void InsertPurchaseOrder()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_InsertPurchaseOredr";

            cmd.Parameters.AddWithValue("@Title", Title);
            cmd.Parameters.AddWithValue("@Pdf", Pdf);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            PurchaseID = Convert.ToInt32(cmd.ExecuteScalar());
            if (PurchaseID == -1)
            {
                OperationStatus = false;
                ErrorMessage = "Error : Some error found please try again.";
            }
            else
            {
                OperationStatus = true;

            }
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }

    public void InsertCertificate()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_InsertCertificate";

            cmd.Parameters.AddWithValue("@Title", Title);
            cmd.Parameters.AddWithValue("@Pdf", Pdf);
            cmd.Parameters.AddWithValue("@Country", Country);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            PurchaseID = Convert.ToInt32(cmd.ExecuteScalar());
            if (PurchaseID == -1)
            {
                OperationStatus = false;
                ErrorMessage = "Error : Some error found please try again.";
            }
            else
            {
                OperationStatus = true;

            }
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }


    public void InsertEmployeeOfmonth()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "So_InsertEmployeeOfMonth";

            cmd.Parameters.AddWithValue("@Title", Title);
            cmd.Parameters.AddWithValue("@Image", Image);
            cmd.Parameters.AddWithValue("@Description", Description);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            NewsID = Convert.ToInt32(cmd.ExecuteScalar());
            if (NewsID == -1)
            {
                OperationStatus = false;
                ErrorMessage = "Error : Some error found please try again.";
            }
            else
            {
                OperationStatus = true;

            }
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }


    public void InsertDistributer()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "sp_insertdistributer";
            cmd.Parameters.AddWithValue("@username", username);
            cmd.Parameters.AddWithValue("@password", password);
            cmd.Parameters.AddWithValue("@companyname",companyname);
            cmd.Parameters.AddWithValue("@address", companyaddress);
            cmd.Parameters.AddWithValue("@state", companystate);
            cmd.Parameters.AddWithValue("@telephone", companytelephone);
            cmd.Parameters.AddWithValue("@fax", companyfax);
            cmd.Parameters.AddWithValue("@mobile",companymobile);
            cmd.Parameters.AddWithValue("@contactperson", contactperson);
            cmd.Parameters.AddWithValue("@email", companyemail);
            cmd.Parameters.AddWithValue("@dealershiparea", Dealershiparea);
            cmd.Parameters.AddWithValue("@admin", false);
            cmd.Parameters.AddWithValue("@companyrating", companyrating);
            cmd.Parameters.AddWithValue("@POStatus", POStatus);
            cmd.Parameters.AddWithValue("@status", true);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            distributer_id = Convert.ToInt32(cmd.ExecuteScalar());
            if (distributer_id == -1)
            {
                OperationStatus = false;
                ErrorMessage = "Error : Some error found please try again.";
            }
            else
            {
                OperationStatus = true;
                
            }
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }
    public void UpdateDealerDetails()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_UpdateDealerDetailByID";
            cmd.Parameters.AddWithValue("@DistributerID", Dist_ID);
            cmd.Parameters.AddWithValue("@username", username);
            cmd.Parameters.AddWithValue("@password", password);
            cmd.Parameters.AddWithValue("@companyname", companyname);
            cmd.Parameters.AddWithValue("@address", companyaddress);
            
            cmd.Parameters.AddWithValue("@telephone", companytelephone);
            cmd.Parameters.AddWithValue("@fax", companyfax);
            cmd.Parameters.AddWithValue("@mobile", companymobile);
            cmd.Parameters.AddWithValue("@contactperson", contactperson);
            cmd.Parameters.AddWithValue("@email", companyemail);
            cmd.Parameters.AddWithValue("@dealershiparea", Dealershiparea);

            cmd.Parameters.AddWithValue("@companyrating", companyrating);
            cmd.Parameters.AddWithValue("@POStatus", POStatus);
            



            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            cmd.ExecuteNonQuery();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }
    public void UpdateOfferDetails()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_UpdateOfferDetail";
            cmd.Parameters.AddWithValue("@OfferID", OfferID);
            cmd.Parameters.AddWithValue("@OfferDescription", SPLOfferDesc);
            cmd.Parameters.AddWithValue("@OfferFolder", SPLFolder);
           
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            cmd.ExecuteNonQuery();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }

    public void UpdateCertificateDetails()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_UpdateCertificateByID";
            cmd.Parameters.AddWithValue("@CertificateID", CirtificateID);
            cmd.Parameters.AddWithValue("@Title", Title);
            cmd.Parameters.AddWithValue("@Pdf", Pdf);
            cmd.Parameters.AddWithValue("@Country", Country);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            cmd.ExecuteNonQuery();
            OperationStatus = true;
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }

    public void GetAllNews()
    {
        try
        {
            SqlDataAdapter ad = new SqlDataAdapter();
            DataTable Sqldatatable = new DataTable();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_GetAllNews";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            ad.SelectCommand = cmd;
            OpenConnection();
            ad.Fill(Sqldatatable);
            DealerTable = Sqldatatable;
            OperationStatus = true;
            CloseConnection();
            Sqldatatable.Dispose();
            cmd.Dispose();
            ad.Dispose();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }


    public void GetEmployee()
    {
        try
        {
            SqlDataAdapter ad = new SqlDataAdapter();
            DataTable Sqldatatable = new DataTable();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_GetEmployee";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            ad.SelectCommand = cmd;
            OpenConnection();
            ad.Fill(Sqldatatable);
            DealerTable = Sqldatatable;
            OperationStatus = true;
            CloseConnection();
            Sqldatatable.Dispose();
            cmd.Dispose();
            ad.Dispose();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }


    public void GetEvaluationdetails()
    {
        try
        {
            SqlDataAdapter ad = new SqlDataAdapter();
            DataTable Sqldatatable = new DataTable();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_GetDealerEvaluation";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            ad.SelectCommand = cmd;
            OpenConnection();
            ad.Fill(Sqldatatable);
            DealerTable = Sqldatatable;
            OperationStatus = true;
            CloseConnection();
            Sqldatatable.Dispose();
            cmd.Dispose();
            ad.Dispose();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }
    public void GetAllDistributer()
    {
        try
        {
            SqlDataAdapter ad = new SqlDataAdapter();
            DataTable Sqldatatable = new DataTable();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_GetAllDistributerList";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            ad.SelectCommand = cmd;
            OpenConnection();
            ad.Fill(Sqldatatable);
            DealerTable = Sqldatatable;
            OperationStatus = true;
            CloseConnection();
            Sqldatatable.Dispose();
            cmd.Dispose();
            ad.Dispose();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }

    public void UpdateDealerEvaluation()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_UpdateDealerEvaluation";
            cmd.Parameters.AddWithValue("@HSaleState", HigSalesState);
            cmd.Parameters.AddWithValue("@HSaleProduct", HighSalesProduct);
            cmd.Parameters.AddWithValue("@HSaleDealer", HighSalesDealer);
            cmd.Parameters.AddWithValue("@Remark", Remark);



            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            cmd.ExecuteNonQuery();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }
    public void GetAllOffer()
    {
        try
        {
            SqlDataAdapter ad = new SqlDataAdapter();
            DataTable Sqldatatable = new DataTable();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_GetAllOffer";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            ad.SelectCommand = cmd;
            OpenConnection();
            ad.Fill(Sqldatatable);
            DealerTable = Sqldatatable;
            OperationStatus = true;
            CloseConnection();
            Sqldatatable.Dispose();
            cmd.Dispose();
            ad.Dispose();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }

    public void GetAllCirtificate()
    {
        try
        {
            SqlDataAdapter ad = new SqlDataAdapter();
            DataTable Sqldatatable = new DataTable();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_GetAllCertificate";
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            ad.SelectCommand = cmd;
            OpenConnection();
            ad.Fill(Sqldatatable);
            DealerTable = Sqldatatable;
            OperationStatus = true;
            CloseConnection();
            Sqldatatable.Dispose();
            cmd.Dispose();
            ad.Dispose();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }

    public void UpdateOfferStatus()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_UpdateOfferStatus";
            cmd.Parameters.AddWithValue("@OfferID", OfferID);
            cmd.Parameters.AddWithValue("@Status", status);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            cmd.ExecuteNonQuery();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }
    public void UpdateNewsStatus()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_UpdateNewsStatus";
            cmd.Parameters.AddWithValue("@NewsID", NewsID);
            cmd.Parameters.AddWithValue("@Status", status);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            cmd.ExecuteNonQuery();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }
    public void UpdatePurchaseOrderStatus()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_UpdatePurchaseStatus";
            cmd.Parameters.AddWithValue("@PurchaseID",  PurchaseID);
            cmd.Parameters.AddWithValue("@Status", status);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            cmd.ExecuteNonQuery();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }
    public void UpdateCirtificateStatus()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_UpdateCertificateStatus";
            cmd.Parameters.AddWithValue("@cirtificateID", CirtificateID);
            cmd.Parameters.AddWithValue("@Status", status);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            cmd.ExecuteNonQuery();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }
    public void UpdateDistributerStatus()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_UpdateDistributerStatus";
            cmd.Parameters.AddWithValue("@DistributerID", Dist_ID);
            cmd.Parameters.AddWithValue("@Status", status);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            cmd.ExecuteNonQuery();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }
    public void UpdateDistributerPOStatus()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_UpdateDistributerPOStatus";
            cmd.Parameters.AddWithValue("@DistributerID", Dist_ID);
            cmd.Parameters.AddWithValue("@POStatus", POStatus);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            cmd.ExecuteNonQuery();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }

    public void UpdateEmployee()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_UpdateEmployee";
            cmd.Parameters.AddWithValue("@Title", Title);
            cmd.Parameters.AddWithValue("@Image", Image);
            cmd.Parameters.AddWithValue("@Description", Description);
            



            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            cmd.ExecuteNonQuery();
            OperationStatus = true;
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }

    public void UpdatePurchaseOrder()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_UpdatePurchaseorderByID";
            cmd.Parameters.AddWithValue("@PurchaseID", PurchaseID);
            cmd.Parameters.AddWithValue("@Title", Title);
            cmd.Parameters.AddWithValue("@Pdf", Pdf);
           




            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            cmd.ExecuteNonQuery();
            OperationStatus = true;
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }

    public void ChangeAdminPassword()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_ChangeAdminPassword";
            cmd.Parameters.AddWithValue("@UserName", username);
            cmd.Parameters.AddWithValue("@Password", password);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            cmd.ExecuteNonQuery();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }


    public void DeleteDistributerByID()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_DeleteDistributerByID";
            cmd.Parameters.AddWithValue("@DistributerID", Dist_ID);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            Dist_ID = Convert.ToInt32(cmd.ExecuteScalar());
            if (Dist_ID == -1)
            {
                OperationStatus = false;
                ErrorMessage = "Error : Dealer does not Exist.";
            }
            else
            {
                OperationStatus = true;
            }
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }

    public void DeleteOfferByID()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_DeleteOffer";
            cmd.Parameters.AddWithValue("@OfferID", OfferID);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            Dist_ID = Convert.ToInt32(cmd.ExecuteScalar());
            if (Dist_ID == -1)
            {
                OperationStatus = false;
                ErrorMessage = "Error : Offer does not Exist.";
            }
            else
            {
                OperationStatus = true;
            }
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }

    public void DeletePurchaseOrderByID()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_DeletePurchaseorderByID";
            cmd.Parameters.AddWithValue("@PurchaseID", PurchaseID);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            Dist_ID = Convert.ToInt32(cmd.ExecuteScalar());
            if (Dist_ID == -1)
            {
                OperationStatus = false;
                ErrorMessage = "Error : Purchase Order does not Exist.";
            }
            else
            {
                OperationStatus = true;
            }
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }
    public void DeleteCirtificateByID()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_DeletecertificateByID";
            cmd.Parameters.AddWithValue("@CertificateID", CirtificateID);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            Dist_ID = Convert.ToInt32(cmd.ExecuteScalar());
            if (Dist_ID == -1)
            {
                OperationStatus = false;
                ErrorMessage = "Error : Certificate does not Exist.";
            }
            else
            {
                OperationStatus = true;
            }
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }

    public void DeleteNewsByID()
    {
        try
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_DeleteNews";
            cmd.Parameters.AddWithValue("@NewsID", NewsID);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            OpenConnection();
            Dist_ID = Convert.ToInt32(cmd.ExecuteScalar());
            if (Dist_ID == -1)
            {
                OperationStatus = false;
                ErrorMessage = "Error : News does not Exist.";
            }
            else
            {
                OperationStatus = true;
            }
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }

    public void GetDistributerdetailsByID()
    {
        try
        {
            SqlDataAdapter ad = new SqlDataAdapter();
            DataTable Sqldatatable = new DataTable();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_GetDealerDetailByID";
            cmd.Parameters.AddWithValue("@DistributerID", Dist_ID);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            ad.SelectCommand = cmd;
            OpenConnection();
            ad.Fill(Sqldatatable);
            DealerTable = Sqldatatable;
            OperationStatus = true;
            CloseConnection();
            Sqldatatable.Dispose();
            cmd.Dispose();
            ad.Dispose();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }


    public void GetOfferByID()
    {
        try
        {
            SqlDataAdapter ad = new SqlDataAdapter();
            DataTable Sqldatatable = new DataTable();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_GetOfferByID";
            cmd.Parameters.AddWithValue("@OfferID", OfferID);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            ad.SelectCommand = cmd;
            OpenConnection();
            ad.Fill(Sqldatatable);
            DealerTable = Sqldatatable;
            OperationStatus = true;
            CloseConnection();
            Sqldatatable.Dispose();
            cmd.Dispose();
            ad.Dispose();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }


    public void GetEmpByID()
    {
        try
        {
            SqlDataAdapter ad = new SqlDataAdapter();
            DataTable Sqldatatable = new DataTable();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_GetEmpByID";
            cmd.Parameters.AddWithValue("@EmpID", EmpID);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            ad.SelectCommand = cmd;
            OpenConnection();
            ad.Fill(Sqldatatable);
            DealerTable = Sqldatatable;
            OperationStatus = true;
            CloseConnection();
            Sqldatatable.Dispose();
            cmd.Dispose();
            ad.Dispose();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }


    public void GetAllPurchase()
    {
        try
        {
            SqlDataAdapter ad = new SqlDataAdapter();
            DataTable Sqldatatable = new DataTable();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_GetAllPurchase";
         
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            ad.SelectCommand = cmd;
            OpenConnection();
            ad.Fill(Sqldatatable);
            DealerTable = Sqldatatable;
            OperationStatus = true;
            CloseConnection();
            Sqldatatable.Dispose();
            cmd.Dispose();
            ad.Dispose();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }
    public void GetPurchaseOrderByID()
    {
        try
        {
            SqlDataAdapter ad = new SqlDataAdapter();
            DataTable Sqldatatable = new DataTable();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_GetPurchaseorderByID";
            cmd.Parameters.AddWithValue("@PurchaseID", PurchaseID);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            ad.SelectCommand = cmd;
            OpenConnection();
            ad.Fill(Sqldatatable);
            DealerTable = Sqldatatable;
            OperationStatus = true;
            CloseConnection();
            Sqldatatable.Dispose();
            cmd.Dispose();
            ad.Dispose();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }
    public void GetCertificateByID()
    {
        try
        {
            SqlDataAdapter ad = new SqlDataAdapter();
            DataTable Sqldatatable = new DataTable();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_GetCertificateByID";
            cmd.Parameters.AddWithValue("@CertificateID", CirtificateID);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            ad.SelectCommand = cmd;
            OpenConnection();
            ad.Fill(Sqldatatable);
            DealerTable = Sqldatatable;
            OperationStatus = true;
            CloseConnection();
            Sqldatatable.Dispose();
            cmd.Dispose();
            ad.Dispose();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }

    public void GetCertificateByCountry()
    {
        try
        {
            SqlDataAdapter ad = new SqlDataAdapter();
            DataTable Sqldatatable = new DataTable();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "SP_GetCertificatesByCountry";
            cmd.Parameters.AddWithValue("@Country", Country);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = Connection;
            ad.SelectCommand = cmd;
            OpenConnection();
            ad.Fill(Sqldatatable);
            DealerTable = Sqldatatable;
            OperationStatus = true;
            CloseConnection();
            Sqldatatable.Dispose();
            cmd.Dispose();
            ad.Dispose();
        }
        catch (Exception ex)
        {
            ErrorMessage = "Error : " + ex.Message;
            OperationStatus = false;
        }
        finally
        {
            CloseConnection();
        }
    }

}