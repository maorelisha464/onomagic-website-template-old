import { Container } from "@mantine/core";
import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";
import { default as getServerSideProps } from "../components/common/getHeaderProps";
import Footer1 from "../components/layouts/footers/footer1";
import Header1 from "../components/layouts/headers/header1";

const P = styled.div``;

const TermsOfService = ({ categories }) => {
  useEffect(() => {
    // tracking.track('vv', 'prepixel', 'FBClick', { utm_campaign, utm_source, article_id: articleId })
  }, []);

  return (
    <>
      <Header1 categories={categories}></Header1>
      <Container size={"md"}>
        <h2>Privacy – Cookie Policy</h2>
        <p>welivelux.com Privacy Notice</p>
        <p>
          <strong>Privacy Notice</strong>
        </p>
        <p>
          We at welivelux.com recognize and respect the importance of maintaining the privacy of visitors to our website (“<strong>Site</strong>“). This Privacy Notice describes the types of information we collect from you when you visit our Site and/or use the services available thereon (“
          <strong>Services</strong>“). This Privacy Notice also explains how we process, transfer, store and disclose the information collected, as well as your ability to control certain uses of the collected information. If not otherwise defined herein, capitalized terms have the meaning given to
          them in the Terms of Service, available at <Link href="/terms-of-service">https://welivelux.com/terms-of-service</Link> (“<strong>Terms</strong>“). “<strong>You</strong>” means any adult user of the Site and/or Services.
        </p>
        <p>
          If you are an individual located in the European Union (“<strong>EU Individual</strong>“), some additional terms and rights may apply to you, as detailed herein. welivelux.com is the data controller in respect of the processing activities outlined in this Privacy Notice. Additional
          entities may be serving as separate, independent controllers of Personal Data they collect through the Site. See below for further details.
        </p>
        <p>
          If you are a resident of the State of California, some additional terms and rights may apply to you, as detailed in the Supplemental Privacy Notice for California Residents available below{" "}
          <Link href="/supplemental-privacy-notice-for-california-residents"> https://welivelux.com/supplemental-privacy-notice-for-california-residents</Link>
        </p>
        <p>
          “<strong>Personal Data</strong>” means any information that refers, is related to, or is associated with an identified or identifiable individual or as otherwise may be defined by applicable law. This Privacy Notice details which Personal Data is collected by us in connection with
          provision of the Services.
        </p>
        <p>
          <strong>
            <u>Privacy Notice Key Points</u>
          </strong>
        </p>
        <p>The key points listed below are presented in further detail throughout this Privacy Notice. You can click on the headers in this section in order to find out more information about any topic. These key points do not substitute the full Privacy Notice.</p>
        <ol>
          <li>
            <strong>Personal Data We Collect, Uses and Legal Basis</strong>
            <strong>
              <u>.</u>
            </strong>
          </li>
          <li>
            <strong>
              <u>Additional Uses</u>
            </strong>
            .
          </li>
          <li>
            <strong>
              <u>Sharing the Personal Data We Collect</u>
            </strong>
            .
          </li>
          <li>
            <strong>
              <u>International&nbsp;Transfer</u>
            </strong>
            <strong>.</strong>
          </li>
          <li>
            <strong>
              <u>Security</u>
            </strong>
            <strong>.</strong>
          </li>
          <li>
            <strong>
              <u>Your Rights – How to Access and Limit Our Use of Certain Personal Data</u>
            </strong>
            <strong>.</strong>
          </li>
          <li>
            <strong>
              <u>Data Retention</u>
            </strong>
            <strong>.</strong>
          </li>
          <li>
            <strong>
              <u>Cookies and Similar Technologies</u>
            </strong>
            <strong>.</strong>
          </li>
          <li>
            <strong>
              <u>Third-Party Applications and Services</u>
            </strong>
            <strong>.</strong>
          </li>
          <li>
            <strong>
              <u>Children</u>
            </strong>
            <strong>.</strong>
          </li>
          <li>
            <strong>
              <u>Changes to the Privacy Notice</u>
            </strong>
            <strong>.</strong>
          </li>
          <li>
            <strong>
              <u>Comments and Questions</u>
            </strong>
            <strong>.</strong>
          </li>
        </ol>
        <p>
          <strong>***</strong>
        </p>
        <ol>
          <li>
            <strong>
              <u>Personal Data We Collect, Uses and Legal Basis</u>
            </strong>
            <strong>.&nbsp;</strong>Depending on your usage, we collect different types of data and we and any of our third-party subcontractors and service providers use the data we collect for different purposes, as specified below. You have no legal obligation to provide us with certain Personal
            Data, but if you refuse to provide such Personal Data we may not be able to register you to the Site and/or provide you with the Services or part thereof.
          </li>
        </ol>
        <ul>
          <li>
            <strong>Contact Information</strong>– When you request information from us, or contact us for any other reason, we will collect any data you provide, such as your email address and the content of your inquiry.
          </li>
        </ul>
        <p>How we use this data: To respond to your request or inquiry.</p>
        <p>Legal Basis: We process this Personal Data based on performance of a contract when we respond to your inquiry.</p>
        <ul>
          <li>
            <strong>Automatically Collected Data –</strong>When you visit the Site, we automatically collect information about your computer or mobile device, including non-Personal Data such as your user agent, operating system, and Personal Data such as your IP address, device ID, as well as your
            browsing history and any information regarding your viewing or use of our Site. For more information about the cookies and similar technologies we use and how to adjust your preferences, please see the section “Cookies and Similar Technologies” below.
          </li>
        </ul>
        <p>
          How we use this data: (1) to review usage and operations, including in an aggregated non-specific analytical manner, develop new products or services and improve current content, products, and Services; (2) to provide you with customized content, targeted offers, and advertising related to
          our products and Services or products and services of third parties, based on your usage history on the Site, on other third-party sites or apps you may visit and/or use, or to exclude you from seeing ads that you’ve already seen.
        </p>
        <p>
          Legal Basis: We process this Personal Data for our legitimate interests to develop and improve our products and Services, review usage, perform analytics, prevent fraud, for our recordkeeping and protection of our legal rights and to market our products and services and those of third
          parties.
        </p>
        <ol start="2">
          <li>
            <strong>
              <u>Additional Uses</u>
            </strong>
            – Statistical Information and Analytics. We and/or our service providers use analytics tools, including “Google Analytics” to collect and analyze information about the use of the Site and/or Services, such as how often users visit the Site, what pages they visit when they do so, and what
            other sites and mobile applications they used prior to visiting the Site. By analyzing the information we receive, we may compile statistical information across a variety of platforms and users, which helps us improve our Site and Services, understand trends and customer needs and
            consider new products and services, and tailor existing products and services to customer desires. You can find more information about how Google collects information and how you can control such use at&nbsp;
            <a href="https://policies.google.com/technologies/partner-sites">https://policies.google.com/technologies/partner-sites</a>
            <a href="https://policies.google.com/technologies/partner-sites.%20%5bNetanella">.</a>
          </li>
          <li>
            <strong>
              <u>Sharing the Personal Data We Collect</u>
            </strong>
            . We share your information, including Personal Data, as follows:
          </li>
        </ol>
        <ul>
          <li>
            Service Providers, and Subcontractors. We disclose information, including Personal Data we collect from and/or about you, to our trusted service providers and subcontractors, who use such information solely on our behalf in order to: (1) help us provide you with the Site and/or Services;
            (2) aid in their understanding of how users are using our Site and/or Services; (3) for the purpose of direct marketing.
          </li>
        </ul>
        <p>Such service providers and subcontractors provide us with IT and system administration services, data backup, security, and storage services, data analysis and help us serve advertisements and provide other marketing services.</p>
        <ul>
          <li>
            Business Transfers. Your Personal Data may be disclosed as part of, or during negotiations of, any merger, sale of company assets or acquisition (including in cases of liquidation). In such case, your Personal Data shall continue being subject to the provisions of this Privacy Notice.
          </li>
          <li>
            Law Enforcement Related Disclosure. We may share your Personal Data with third parties: (i) if we believe in good faith that disclosure is appropriate to protect our or a third party’s rights, property or safety (including the enforcement of the Terms and this Privacy Notice); (ii) when
            required by law, regulation subpoena, court order or other law enforcement related issues, agencies and/or authorities; or (iii) as is necessary to comply with any legal and/or regulatory obligation.
          </li>
          <li>Legal Uses. We may use your Personal Data as required or permitted by any applicable law, for example, to comply with audit and other legal requirements.</li>
          <li>
            When you click on an ad, whether or not it’s on our Site, the relevant advertiser will be alerted that someone has visited the page on which the relevant advertisement was displayed, and may be able to identify that it was you by using certain mechanisms, like cookies. Some advertisers
            may be serving as independent controllers of the Personal Data they collect. See below for a list of advertisers.
          </li>
          <li>
            Other Uses or Transfer of Your Personal Data. If you use our Site and/or Services with or through a third-party service, site and/or mobile application, we may receive information (including Personal Data) about you from those third parties. Please note that when you use third parties
            outside of our Site and/or Services, their own terms and privacy policies will govern your use of those services.
          </li>
        </ul>
        <ol start="4">
          <li>
            <strong>
              <u>International&nbsp;Transfer</u>
            </strong>
            .
          </li>
        </ol>
        <ul>
          <li>
            We use subcontractors and service providers who are located in countries other than your own and send them information we receive (including Personal Data). We conduct such international transfers for the purposes described above. [We will ensure that these third parties will be subject
            to written agreements ensuring the same level of privacy and data protection as set forth in this Privacy Notice, including appropriate remedies in the event of the violation of your data protection rights in such third country.
          </li>
          <li>
            Whenever we transfer your Personal Data to third parties based outside of the European Economic Area (“<strong>EEA</strong>“) and when required under applicable law, we ensure a similar degree of protection is afforded to it by ensuring at least one of the following safeguards is
            implemented:
          </li>
          <li>We will only transfer your Personal Data to countries that have been deemed to provide an adequate level of protection for Personal Data by the European Commission.</li>
          <li>Where we use certain service providers not located in countries with an adequate level of protection as determined by the European Commission, we may use specific contracts approved by the European Commission which give Personal Data the same protection it has in the EEA.</li>
          <li>Please contact us at&nbsp;info@welivelux.com&nbsp;if you would like further information on the specific mechanism used by us when transferring your Personal Data out of the EEA.</li>
        </ul>
        <ol start="5">
          <li>
            <strong>
              <u>Security</u>
            </strong>
            . We have implemented and maintain appropriate technical and organization security measures, policies and procedures designed to reduce the risk of accidental destruction or loss, or the unauthorized disclosure or access to Personal Data appropriate to the nature of such data. The
            measures we take include:
          </li>
        </ol>
        <ul>
          <li>Safeguards – The physical, electronic, and procedural safeguards we employ to protect your Personal Data include secure servers, firewalls, antivirus, and SSL encryption of data.</li>
          <li>Access Control – We dedicate efforts for a proper management of system entries and limit access only to authorized personnel on a need to know basis of least privilege rules, review permissions quarterly, and revoke access immediately after employee termination.</li>
          <li>Internal Policies – We maintain and regularly review and update our privacy related and information security policies.</li>
          <li>Personnel – We require new employees to sign non-disclosure agreements according to applicable law and industry customary practice.</li>
          <li>Encryption – We encrypt the data in transit using secure SSL protocols.</li>
          <li>Database Backup – Our databases are backed up on a periodic basis for certain data and are verified regularly.]</li>
          <li>However, no method of transmission over the Internet or method of electronic storage is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</li>
          <li>As the security of information depends in part on the security of the computer you use to communicate with us and the security you use to protect user IDs and passwords, please take appropriate measures to protect this information.</li>
        </ul>
        <ol start="6">
          <li>
            <strong>
              <u>Your Rights – How to Access and Limit Our Use of Certain Personal Data</u>
            </strong>
            <strong>.&nbsp;</strong>Subject to applicable law and certain exemptions, and in some cases dependent upon the processing activity we are undertaking, you have certain rights in relation to the Personal Data that we hold about you, as detailed below. We will investigate and attempt to
            resolve complaints and disputes and make every reasonable effort to honor your wish to exercise your rights as quickly as possible and, in any event, within the timescales provided by applicable data protection laws. We reserve the right to ask for reasonable evidence to verify your
            identity before we provide you with any information and/or comply with any of your requests, as detailed below:
          </li>
        </ol>
        <ul>
          <li>
            Right of Access. You have a right to know what Personal Data we collect about you and, in some cases, to have such Personal Data communicated to you. Subject to applicable law, we may charge you with a fee. Please note that we may not be able to provide you with all the information you
            request, and, in such case, we will endeavor to explain to you why.
          </li>
          <li>
            Right to Data Portability. If the processing is based on your consent or performance of a contract with you&nbsp;<em>and</em>processing is being carried out by automated means, you may be entitled to (request that we) provide you or another party with a copy of the Personal Data you
            provided to us in a structured, commonly-used, and machine-readable format.
          </li>
          <li>Right to Correct Personal Data. Subject to the limitations in applicable law, you may request that we update, complete, correct or delete inaccurate, incomplete, or outdated Personal Data.</li>
          <li>
            Deletion of Personal Data (“Right to Be Forgotten”). If you are an EU Individual, you have a right to request that we delete your Personal Data if either: (i) it is no longer needed for the purpose for which it was collected, (ii) our processing was based on your consent and you have
            withdrawn your consent, (iii) you have successfully exercised your Right to Object (see below), (iv) processing was unlawful, or (v) we are required to erase it for compliance with a legal obligation. We cannot restore information once it has been deleted. Please note that to ensure that
            we do not collect any further Personal Data, you should clear our cookies from any device where you have visited our Site. We may retain certain Personal Data (including following your request to delete) for audit and record-keeping purposes, or as otherwise permitted and/or required
            under applicable law.
          </li>
          <li>
            Right to Restrict Processing. If you are an EU Individual, you can ask us to limit the processing of your Personal Data if either: (i) you have contested its accuracy and wish us to limit processing until this is verified; (ii) the processing is unlawful, but you do not wish us to erase
            the Personal Data; (iii) it is no longer needed for the purposes for which it was collected, but we still need it to establish, exercise, or defend of a legal claim; (iv) you have exercised your Right to Object (below) and we are in the process of verifying our legitimate grounds for
            processing. We may continue to use your Personal Data after a restriction request under certain circumstances.
          </li>
          <li>
            Right to Object. If you are an EU Individual, you can object to any processing of your Personal Data which has our legitimate interests as its legal basis, if you believe your fundamental rights and freedoms outweigh our legitimate interests. If you raise an objection, we have an
            opportunity to demonstrate that we have compelling legitimate interests which override your rights and freedoms.
          </li>
          <li>
            Right to Lodge a Complaint with Your Local Supervisory Authority. If you are an EU Individual, you may have the right to submit a complaint to the relevant supervisory data protection authority if you have any concerns about how we are processing your Personal Data, though we ask that as
            a courtesy you please attempt to resolve any issues with us first.
          </li>
        </ul>
        <ol start="7">
          <li>
            <strong>
              <u>Data Retention</u>
            </strong>
            .
          </li>
        </ol>
        <ul>
          <li>
            Subject to applicable law we retain Personal Data as necessary for the purposes set forth above. We may delete information from our systems without notice to you once we deem it is no longer necessary for these purposes. Retention by any of our processors may vary in accordance with the
            processor’s retention policy.
          </li>
          <li>
            In some circumstances, we may store your Personal Data for longer periods of time, for instance where we are required to do so in accordance with legal, regulatory, tax, audit, accounting requirements and so that we have an accurate record of your dealings with us in the event of any
            complaints or challenges, or if we reasonably believe there is a prospect of litigation relating to your Personal Data or dealings. To determine the appropriate retention period, we consider the amount, nature, and sensitivity of the Personal Data, the potential risk of harm from
            unauthorized use or disclosure of your Personal Data, the purposes for which we process your Personal Data, and whether those purposes can be achieved through other means, as well as applicable legal requirements.
          </li>
          <li>Please contact us at info@welivelux.com if you would like details regarding the retention periods for different types of your Personal Data.</li>
        </ul>
        <ol start="8">
          <li>
            <strong>
              <u>Cookies and Similar Technologies</u>
            </strong>
            . We use cookies and similar technologies for a number of reasons, including to help personalize your experience and to personalize the ads we serve you. Third parties through which we provide the Services and/or our business partners may be placing and reading cookies on your browser or
            using web beacons to collect information in the course of advertising being served on different websites.
          </li>
        </ol>
        <ul>
          <li>What are Cookies? A cookie is a small piece of text that is sent to a user’s browser or device. The browser provides this piece of text to the device of the originating user when this user returns.</li>
          <li>A “session cookie” is temporary and will remain on your device until you leave the Site.</li>
          <li>A “persistent” cookie may be used to help save your settings and customizations across visits. It will remain on your device until you delete it.</li>
          <li>First-party cookies are placed by us, while third-party cookies may be placed by a third party. We use both first- and third-party cookies.</li>
          <li>We may use the terms “cookies” to refer to all technologies that we may use to store data in your browser or device or that collect information or help us identify you in the manner described above, such as web beacons or “pixel tags”.</li>
          <li>How We Use Cookies. We use cookies and similar technologies for a number of reasons, as specified below. We will not place any cookies on your browser that are not strictly necessary unless you have first consented to the cookie pop up.</li>
        </ul>
        <p>The specific names and types of the cookies, web beacons, and other similar technologies we use may change from time to time. However, the cookies we use generally fall into one of the following categories:</p>
        <table width="750">
          <tbody>
            <tr>
              <td>
                <p>
                  <strong>Type of Cookie</strong>
                </p>
              </td>
              <td>
                <p>
                  <strong>Why We Use These Cookies</strong>
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Analytics</p>
              </td>
              <td>
                <p>These cookies collect information regarding your activity on our Site to help us learn more about which features are popular with our users and how our Site can be improved.</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Advertising</p>
              </td>
              <td>
                <p>
                  These cookies are placed in order to deliver content, including ads relevant and meaningful to you and your interests. They may also be used to deliver targeted advertising or to limit the number of times you see an advertisement. This can help us track how efficient advertising
                  campaigns are, both for our own Services and for other websites. Such cookies may track your browsing habits and activity when visiting our Site and those of third parties.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <ul>
          <li>Third-Party Cookies. Our advertising partners use advertising cookies on our Site and use Personal Data they collect in accordance with their respective privacy notices and their agreements with us.</li>
          <li>
            How to Adjust Your Preferences. Most Web browsers are initially configured to accept cookies, but you can change this setting so your browser either refuses all cookies or informs you when a cookie is being sent. In addition, you are free to delete any existing cookies at any time.
            Please note that some features of the Services may not function properly when cookies are disabled or removed.
          </li>
          <li>
            By changing your device settings, you can prevent your device’s ad identifier being used for interest-based advertising, or you can reset your device’s ad identifier. Typically, you can find the ad identifier settings under “privacy” or “ads” in your device’s settings, although settings
            may vary from device to device. Adjusting your preferences as described in this section herein does not mean you will no longer receive advertisements; it only means the advertisements that you do see will be less relevant to your interests.
          </li>
        </ul>
        <ol start="9">
          <li>
            <strong>
              <u>Third-Party Applications and Services</u>
            </strong>
            . All use of third-party applications or services is at your own risk and subject to such third party’s terms and privacy policies.
          </li>
        </ol>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <ol start="10">
          <li>
            <strong>
              <u>Children</u>
            </strong>
            . We do not knowingly collect Personal Data from children for whom parental consent would be needed for such collection. In the event that you become aware that an individual for whom parental consent is needed has visited the Site and/or used the Services, please advise us immediately.
            The relevant age varies per jurisdiction and is usually between 13-16 years.
          </li>
          <li>
            <strong>
              <u>Changes to the Privacy Notice</u>
            </strong>
            . We may update this Privacy Notice from time to time to keep it up to date with legal requirements and the way we operate our business, and we will place any updates on this webpage. Please come back to this page every now and then to make sure you are familiar with the latest version.
            If we make material changes to this Privacy Notice, we will seek to inform you by notice on our Site or via email.
          </li>
          <li>
            <strong>
              <u>Comments and Questions</u>
            </strong>
            . If you have any comments or questions about this Privacy Notice or if you wish to exercise any of your legal rights as set out herein, please contact us at&nbsp;info@welivelux.com
          </li>
        </ol>
        <p>
          <em>Last updated: 20.11.2022</em>
        </p>
      </Container>
      <Footer1></Footer1>
    </>
  );
};

export default TermsOfService;

export { getServerSideProps };
