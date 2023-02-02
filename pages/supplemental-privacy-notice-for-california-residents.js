import { Container } from "@mantine/core";
import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";
import Footer1 from "../components/layouts/footers/footer1";
import Header1 from "../components/layouts/headers/header1";
import tracking from "../components/tracking/tracking";
import { default as getServerSideProps } from "../components/common/getHeaderProps";

const P = styled.div``;

const SPNFCR = ({ categories }) => {
  useEffect(() => {
    // tracking.track('vv', 'prepixel', 'FBClick', { utm_campaign, utm_source, article_id: articleId })
  }, []);

  return (
    <>
      <Header1 categories={categories}></Header1>
      <Container size={"md"}>
        <h2>Supplemental Privacy Notice for California Residents</h2>
        <p>Supplemental Privacy Notice for California Residents</p>
        <p>
          <strong>Supplemental Privacy Notice for California Residents</strong>
        </p>
        <p>
          This Supplemental Privacy Notice for California Residents (“<strong>CA Supplement</strong>“) supplements and forms an integral part of our general privacy notice, available at&nbsp;<Link href="/privacy-cookie-policy">welivelux.com/privacy-cookie-policy</Link> (“
          <strong>Privacy Notice</strong>“). This CA Supplement describes how we collect, share, and store personal information about California residents who use our Site and/or Services, as well as the rights they have with respect to that information. If not otherwise defined herein, capitalized
          terms have the meaning given to them in our Privacy Notice. Please read the Privacy Notice for additional terms that may apply to you.
        </p>
        <p>
          “<strong>Personal Information</strong>” means any information that identifies, relates to, describes, is reasonably capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer or household, or as otherwise may be defined by applicable
          law.
        </p>
        <p>Depending on your usage, we collect different types of information and we and any of our third-party sub-contractors and service providers use the information we collect for different purposes, as specified below.</p>
        <p>This CA Supplement will cover the following topics:</p>
        <ol>
          <li>Categories of Personal Information We Collect</li>
          <li>How We Share Your Personal Information</li>
          <li>Your Rights – How to Access and Limit Our Use of Certain Personal Information</li>
          <li>How to Contact Us</li>
          <li>
            In the past twelve months, we have collected the following Personal Information from users of our Site and/or Services who are using the Site as performers. This Personal Data is used for the purposes described in the Privacy Notice.
            <ul>
              <li>
                Contact Information. If you contact us, we collect certain&nbsp;<strong>identifiers</strong>
                <strong>directly</strong>&nbsp;from you, such as your name, email address, and the content of your message.
              </li>
              <li>
                Device/Network Information. When you use the Site or Services, we will collect information about your device&nbsp;<strong>automatically</strong>, including non-Personal Information such as your operating system and browser type,&nbsp;<strong>identifiers</strong>such as your IP
                address or device ID, and&nbsp;<strong>internet and other electronic network activity</strong>&nbsp;such as your browsing history and usage data.
              </li>
              <li>
                Product/Usage Information. We collect&nbsp;<strong>commercial information</strong>regarding Performances that you have booked, including the pricing for such Performances. We collect this information&nbsp;<strong>automatically</strong>.
              </li>
            </ul>
          </li>
        </ol>
        <p>
          <strong>2.How We&nbsp;Share Your Personal Information</strong>:
        </p>
        <ul>
          <li>
            for Business Purposes. In the past 12 months, we have disclosed the following categories of Personal Information for the following business or purpose in the preceding 12 months: we have shared your&nbsp;<strong>personal identifiers</strong>and&nbsp;
            <strong>internet or other electronic network activity</strong>&nbsp;with data analytics providers, advertisers, operating systems, and other third parties that assist us in providing you with the Services, including providing us with IT and system administration services, data backup,
            security, and storage services, and to help us serve advertisements and provide other marketing services.
          </li>
        </ul>
        <p>
          <strong>Additional Sharing Activities:</strong>
        </p>
        <ul>
          <li>
            Business Transfers: Your Personal Information may be disclosed as part of, or during negotiations of, any merger, sale of company assets or acquisition (including in cases of liquidation). In such a case, your Personal Information shall continue being subject to the provisions of this CA
            Supplement.
          </li>
          <li>
            Law Enforcement Related Disclosure: We may share your Personal Information with third parties: (i) if we believe in good faith that such disclosure is appropriate to protect our or a third party’s rights, property or safety (including the enforcement of the Terms, the Privacy Notice, and
            this CA Supplement); (ii) when required by law, regulation subpoena, court order or other law enforcement related issues, agencies and/or authorities; or (iii) as is necessary to comply with any legal and/or regulatory obligation.
          </li>
          <li>
            Other Uses or Transfer of Your Personal Information: If you use our Services together with or through a third-party service, site and/or mobile application, we may receive information (including Personal Information) about you from those third parties. Please note that when you use third
            parties outside of our Site or Services, their own terms and privacy policies will govern your use of those services.
          </li>
        </ul>
        <ol start="3">
          <li>
            <strong>Your Rights – How to Access and Limit Our Use of Certain Personal Information</strong>. Subject to certain exemptions, you have certain rights in relation to the Personal Information that we have collected about you, as detailed below. In accordance with applicable law, we may
            ask for reasonable evidence to verify your identity before we comply with certain of your requests, as detailed below.
          </li>
        </ol>
        <p>
          <strong>Your Rights:</strong>
        </p>
        <ul>
          <li>Right of Access. You have the right to request that we disclose to you any or all of the following in respect of the 12-month period preceding your request:</li>
          <li>The specific Personal Information we have collected about you.</li>
          <li>The categories of Personal Information we have collected about you.</li>
          <li>The categories of sources from which we collected the Personal Information about you.</li>
          <li>The categories of third parties with whom we share Personal Information about you.</li>
          <li>The categories of Personal Information about you we have sold and the categories of third parties to whom we have sold such Personal Information.</li>
          <li>The categories of Personal Information about you we have disclosed for a business purpose and the categories of third parties to whom we have disclosed such Personal Information.</li>
          <li>Our business or commercial purpose(s) for collecting or selling your Personal Information.</li>
          <li>Right to Delete. Subject to certain exceptions, you have the right to request that we and any of our service providers delete your Personal Information.</li>
          <li>Right to Correct. If you find that any of the we’ve collected about you is inaccurate, you have the right to correct such information.</li>
          <li>
            Right to Opt-Out of the Sale of Personal Information. If you are 16 years of age or older or have opted-in to the sale of your Personal Information, you have the right to direct us to not sell your Personal Information at any time. You may change your mind and opt back into the sale of
            your Personal Information at any time by contacting us at the address above. We may deny any request to opt-out of the sale of Personal Information that we deem in our good-faith, reasonable and documented belief is fraudulent.
          </li>
          <li>Right to Non-Discrimination for Exercising your Consumer Privacy Rights. You have the right not to be discriminated against for exercising any of your consumer privacy rights, such as, not being denied any goods or services or charged different prices or rates.</li>
        </ul>
        <p>
          <strong>How to Exercise your California Privacy Rights:</strong>
        </p>
        <ul>
          <li>Contact Information. To exercise any of the rights detailed above, please submit a verifiable request to us by contacting us info@welivelux.com You may only request to exercise your right of access twice within a 12-month period.</li>
          <li>
            Submitting a Verifiable Request: In order to exercise your right to know or right to delete you must submit a request containing sufficient information that allows us to reasonably verify you are the person about whom we collected the applicable Personal Information or an authorized
            agent of such person, which may include details relating to your account. Any requests made through your password protected account will be verified through our existing authentication procedures for such account.
          </li>
          <li>
            Submitting Requests through an Authorized Agent: An authorized agent may exercise requests on your behalf. In order to exercise your right to know or right to delete through an agent, we may ask for reasonable evidence to verify your identity and the agent’s identity, and written
            authorization permitting the agent to act on your behalf before complying with your request. In order to submit a request to opt-out of the sale of your Personal Information through an agent, we may ask for written authorization permitting the authorized agent to act on your behalf
            before complying with your request. We reserve the right to deny the request of any agent that does not provide proof that they have been authorized to act on behalf of the applicable consumer in accordance with applicable law.
          </li>
          <li>Children: We do not knowingly sell the Personal Information of California residents under 16 years of age.</li>
          <li>. If you have any comments or questions about this CA Supplement or our privacy practices, or if you wish to exercise any of your legal rights as set out herein, please contact us at info@welivelux.com </li>
        </ul>
      </Container>
      <Footer1></Footer1>
    </>
  );
};

export default SPNFCR;

export { getServerSideProps };
