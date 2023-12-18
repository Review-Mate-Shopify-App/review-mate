const mjml2html = require('mjml');
const ejs = require('ejs');

function getHtmlStringForReviewMail({
  receiverName,
  reviewPageUrl,
  productImageUrl,
  productName,
}) {

  let params = {
    receiverName,
    reviewPageUrl,
    productImageUrl,
    productName,
  }

  const mjmlObject = mjml2html(`
  <mjml>
  <mj-head>
    <mj-title>Discount Light</mj-title>
    <mj-preview>Pre-header Text</mj-preview>
    <mj-attributes>
      <mj-all font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"></mj-all>
      <mj-text font-weight="400" font-size="16px" color="#000000" line-height="24px" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"></mj-text>
    </mj-attributes>
    <mj-style inline="inline">
      .body-section {
      -webkit-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15);
      -moz-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15);
      box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15);
      }
    </mj-style>
    <mj-style inline="inline">
      .text-link {
      color: #5e6ebf
      }
    </mj-style>
    <mj-style inline="inline">
      .footer-link {
      color: #888888
      }
    </mj-style>

  </mj-head>
  <mj-body background-color="#E7E7E7" width="600px">
    <mj-section background-color="#040B4F" padding-bottom="0">
      <mj-column width="100%">

        <mj-text color="#ffffff" font-weight="bold" align="center" text-transform="uppercase" font-size="16px" letter-spacing="1px" padding-top="30px">
          Review Mate
          <br />

        </mj-text>
        <mj-text color="#637381" align="center" font-size="13px" padding-top="0" font-weight="bold" text-transform="uppercase" letter-spacing="1px" line-height="20px">
          Your Personal Store Review Mate Is Here
          <br />

        </mj-text>

      </mj-column>
    </mj-section>


    <mj-wrapper padding-top="0" padding-bottom="0" css-class="body-section">
      <mj-section background-color="#ffffff" padding-left="15px" padding-right="15px">
        <mj-column width="100%">
          <mj-text color="#212b35" font-weight="bold" font-size="20px">
            Shopify Store
          </mj-text>
          <mj-text color="#637381" font-size="18px">
            Hi <%=receiverName%> ,
          </mj-text>
          <mj-text color="#637381" font-size="18px">
            Please provide feedback by rating our product (<%=productName%>), on a scale of 1 to 5 stars:
          </mj-text>

          <mj-image height="200px" width="200px" align="center" alt="image" src="<%=productImageUrl%>" />
        </mj-column>
      </mj-section>

      <mj-section background-color="#ffffff" padding-left="12px" padding-right="12px" padding-top="0">


        <mj-column>


          <mj-image href="<%=reviewPageUrl%>" align="center" src="https://png.pngitem.com/pimgs/s/11-115233_grey-star-icon-png-transparent-png.png" alt="Image" width="32px" height="32px" />
          <mj-text align="center" color="#EE4B2B">
            Terrible
          </mj-text>
        </mj-column>

        <mj-column>
          <mj-image href="<%=reviewPageUrl%>" align="center" src="https://png.pngitem.com/pimgs/s/11-115233_grey-star-icon-png-transparent-png.png" alt="Image" width="32px" height="32px" />
          <mj-text align="center" color="#FF0000">
            Bad
          </mj-text>
        </mj-column>


        <mj-column>
          <mj-image href="<%=reviewPageUrl%>" align="center" src="https://png.pngitem.com/pimgs/s/11-115233_grey-star-icon-png-transparent-png.png" alt="Image" width="32px" height="32px" />
          <mj-text align="center" color="#E4D00A">
            Okay
          </mj-text>
        </mj-column>



        <mj-column>
          <mj-image href="<%=reviewPageUrl%>" align="center" src="https://png.pngitem.com/pimgs/s/11-115233_grey-star-icon-png-transparent-png.png" alt="Image" width="32px" height="32px" />
          <mj-text align="center" color="#FDDA0D">
            Good
          </mj-text>
        </mj-column>

        <mj-column>
          <mj-image href="<%=reviewPageUrl%>" align="center" src="https://png.pngitem.com/pimgs/s/11-115233_grey-star-icon-png-transparent-png.png" alt="Image" width="32px" height="32px" />
          <mj-text align="center" color="#228B22">
            Excellent
          </mj-text>
        </mj-column>

      </mj-section>




      <mj-section background-color="#ffffff" padding-left="15px" padding-right="15px" padding-top="0">
        <mj-column width="100%">
          <mj-divider border-color="#DFE3E8" border-width="1px" />
        </mj-column>
      </mj-section>
      <mj-section background-color="#ffffff" padding="0 15px 0 15px">
        <mj-column width="100%">

          <mj-text color="#637381" font-size="16px">
            Not happy? Please contact us first so we can help.
          </mj-text>
          <mj-text color="#212b35" font-weight="bold" font-size="20px" padding-bottom="0">
            Team at ReviewMate
          </mj-text>
        </mj-column>
      </mj-section>

      <mj-section background-color="#ffffff" padding-left="15px" padding-right="15px">

      </mj-section>
    </mj-wrapper>

    <mj-wrapper full-width="full-width">
      <mj-section>
        <mj-column width="100%" padding="0">
          <mj-social font-size="15px" icon-size="30px" mode="horizontal" padding="0" align="center">
            <mj-social-element name="facebook" href="https://mjml.io/" background-color="#A1A0A0">
            </mj-social-element>
            <mj-social-element name="google" href="https://mjml.io/" background-color="#A1A0A0">
            </mj-social-element>
            <mj-social-element name="twitter" href="https://mjml.io/" background-color="#A1A0A0">
            </mj-social-element>
            <mj-social-element name="linkedin" href="https://mjml.io/" background-color="#A1A0A0">
            </mj-social-element>
          </mj-social>

          <mj-text color="#445566" font-size="11px" align="center" line-height="16px">
            You have received this email from ReviewMate in response to your recent order at Shopify Store.
          </mj-text>
          <mj-text color="#445566" font-size="11px" align="center" line-height="16px">
            &copy; Sent with ❤️ from ReviewMate Inc., All Rights Reserved.
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section padding-top="0">


      </mj-section>
    </mj-wrapper>

  </mj-body>
</mjml>
    `);

  const htmlString = ejs.render(mjmlObject.html, params);


  return htmlString;
}






function getHtmlStringForReceivedReplyReviewMail({
  receiverName,
  productName,
  textBodyContent,

}) {

  let params = {
    receiverName,
    productName,
    textBodyContent,
  }

  const mjmlObject = mjml2html(`

  <mjml>
  <mj-head>
    <mj-title>Discount Light</mj-title>
    <mj-preview>Pre-header Text</mj-preview>
    <mj-attributes>
      <mj-all font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"></mj-all>
      <mj-text font-weight="400" font-size="16px" color="#000000" line-height="24px" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"></mj-text>
    </mj-attributes>
    <mj-style inline="inline">
      .body-section {
      -webkit-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15);
      -moz-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15);
      box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15);
      }
    </mj-style>
    <mj-style inline="inline">
      .text-link {
      color: #5e6ebf
      }
    </mj-style>
    <mj-style inline="inline">
      .footer-link {
      color: #888888
      }
    </mj-style>

  </mj-head>
  <mj-body background-color="#E7E7E7" width="600px">


    <mj-section background-color="#040B4F" padding-bottom="0">
      <mj-column width="100%">

        <mj-text color="#ffffff" font-weight="bold" align="center" text-transform="uppercase" font-size="16px" letter-spacing="1px" padding-top="30px">
          Review Mate
          <br />
        </mj-text>
        <mj-text color="#17CBC4" align="center" font-size="13px" padding-top="0" font-weight="bold" text-transform="uppercase" letter-spacing="1px" line-height="20px">
          Your Personal Store Review Mate Is Here

        </mj-text>

      </mj-column>
    </mj-section>

    <mj-wrapper padding-top="0" padding-bottom="0" css-class="body-section">
      <mj-section background-color="#ffffff" padding-left="15px" padding-right="15px">
        <mj-column width="100%">
          <mj-text color="#212b35" font-weight="bold" font-size="20px">
            Hi <%=receiverName%>,
          </mj-text>

          <mj-text color="#637381" font-size="16px">
            You have received a reply on your review for <%=productName%>
          </mj-text>

        </mj-column>
        <mj-column width="80%" background-color="#D3D3D3" padding-bottom="20px">


          <mj-text color="#637381" padding="10px 10px 10px 10px">
            <%=textBodyContent%>
          </mj-text>

        </mj-column>


      </mj-section>

      <mj-section background-color="#ffffff" padding-left="15px" padding-right="15px" padding-top="0">
        <mj-column width="100%">
          <mj-divider border-color="#DFE3E8" border-width="1px" />
        </mj-column>
      </mj-section>
      <mj-section background-color="#ffffff" padding="0 15px 15px 15px">
        <mj-column width="100%">
          <mj-text color="#212b35" font-weight="bold" font-size="20px" padding-bottom="0">
            Kind regards,
          </mj-text>
          <mj-text color="#637381" font-size="16px">
            Your friends at <a class="text-link" > ReviewMate</a>.
          </mj-text>
        </mj-column>


        <mj-column width="100%">



          <mj-text color="#637381" font-size="16px">
            Platform : shopify
          </mj-text>

        </mj-column>
      </mj-section>


    </mj-wrapper>





    <mj-wrapper full-width="full-width">



      <mj-section>
        <mj-column width="100%" padding="0">



          <mj-text color="#445566" font-size="11px" align="center" line-height="16px">
            Sent with ❤️ from ReviewMate
          </mj-text>
        </mj-column>
      </mj-section>

    </mj-wrapper>

  </mj-body>
</mjml>

    `);

  const htmlString = ejs.render(mjmlObject.html, params);


  return htmlString;
}





module.exports = { getHtmlStringForReviewMail, getHtmlStringForReceivedReplyReviewMail };