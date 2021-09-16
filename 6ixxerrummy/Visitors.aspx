<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Visitors.aspx.cs" Inherits="Visitors" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <asp:GridView ID="grid_visitor" runat="server" Width="100%" AutoGenerateColumns="False"
                DataKeyNames="ID" CellPadding="3" ForeColor="#333333" GridLines="None">
                <RowStyle BackColor="#ffffff" HorizontalAlign="Center" />
                <AlternatingRowStyle BackColor="#ffffff" HorizontalAlign="Center" />
                <Columns>
                    <asp:TemplateField>
                        <HeaderTemplate>
                            Sr. No.
                        </HeaderTemplate>
                        <ItemTemplate>
                            <%# Container.DataItemIndex + 1 %><asp:HiddenField ID="hdn_BlogID" runat="server"
                                Value='<%# Eval("ID") %>' />
                        </ItemTemplate>
                    </asp:TemplateField>

                    <asp:BoundField DataField="IPAddress" HeaderText="Ip Address" SortExpression="IPAddress" HeaderStyle-ForeColor="White" />
                    <asp:BoundField DataField="DateTime" HeaderText="Date" SortExpression="DateTime"
                        HeaderStyle-ForeColor="White" />

                </Columns>
                <EmptyDataTemplate>
                    Sorry, no data found as your search criteria.
                </EmptyDataTemplate>
                <EmptyDataRowStyle CssClass="header-mainnew2" HorizontalAlign="Left" ForeColor="Red"
                    VerticalAlign="Middle" />
                <FooterStyle BackColor="#0190B9" Font-Bold="True" ForeColor="White" />
                <PagerStyle BackColor="#0190B9" ForeColor="White" HorizontalAlign="Center" />
                <SelectedRowStyle BackColor="#D1DDF1" Font-Bold="True" ForeColor="#333333" />
                <HeaderStyle BackColor="#0190B9" Font-Bold="True" ForeColor="white" HorizontalAlign="Center" />
                <EditRowStyle BackColor="#2461BF" />
            </asp:GridView>
        </div>
    </form>
</body>
</html>
