import { Container } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import Footer1 from "../components/layouts/footers/footer1";
import Header1 from "../components/layouts/headers/header1";
import tracking from "../components/tracking/tracking";
import { default as getServerSideProps } from "../components/common/getHeaderProps";

const P = styled.div``;

const TermsOfService = ({ categories }) => {
  useEffect(() => {
    // tracking.track('vv', 'prepixel', 'FBClick', { utm_campaign, utm_source, article_id: articleId })
  }, []);

  return (
    <>
      <Header1 categories={categories}></Header1>
      <Container size={"md"}>
        <h2>Terms Of Service</h2>
        <p>Terms of Service</p>
        <p>
          <strong>Terms of Service</strong>
        </p>
        <p>
          welivelux.com owns and maintains this website (“<strong>Site</strong>“). These Terms of Service (“<strong>Terms</strong>“) govern your access and use of the Site and the features available thereon, including without limitation, any informational material if and as available from time to
          time (“<strong>Services</strong>“). Our Privacy Notice, available at <Link href="privacy-cookie-policy">welivelux.com/privacy-cookie-policy </Link> (“<strong>Privacy Notice</strong>“) governs our collection, processing and transfer of any Personal Data (as such term is defined in the
          Privacy Notice). “<strong>You</strong>” means any adult user of the Site and/or Services.
        </p>
        <p>Please read these Terms carefully. By visiting our Site, you agree to be bound by these Terms, as they may be amended from time to time. Your continued use of the Site following any update shall be deemed acceptance of any such amended or updated terms.</p>
        <ol>
          <li>
            <strong>Use of Services</strong>
          </li>
        </ol>
        <ul>
          <li>Subject to these Terms, Company allows you to access and use the Site and Services on a non-exclusive basis for informational purposes.</li>
          <li>
            Use of and access to the Services is void where prohibited by law. You represent and warrant that your use of the Site and Services does not violate any applicable law, regulation, or obligation you may have to a third party and you shall comply with applicable laws, regulations,
            guidelines, and these Terms throughout your use of the Site and Services.
          </li>
          <li>
            The Services are intended to be used by individuals for whom no parental consent is needed for the use of the Services and/or for the collection of Personal Data in the applicable jurisdiction. If parental consent is required for use of the Services and/or collection of your data, you
            are prohibited from using the Site and/or Services. The relevant age varies per jurisdiction and is usually between 13-16 years.
          </li>
        </ul>
        <ol start="2">
          <li>
            <strong>Content</strong>
          </li>
        </ol>
        <ul>
          <li>
            Certain types of content may be made available on the Site. “<strong>Content</strong>” as used in these Terms means, collectively, all content on or made available on the Site, including any images, photos, pictures, videos, or articles, and any modifications or derivatives of the
            foregoing.
          </li>
          <li>
            COMPANY DOES NOT ENDORSE ANY CONTENT OR ANY OPINION, RECOMMENDATION, OR ADVICE EXPRESSED IN ANY CONTENT AND EXPRESSLY DISCLAIMS ANY AND ALL LIABILITY IN CONNECTION WITH THE CONTENT. COMPANY DISCLAIMS ALL LIABILITY, REGARDLESS OF THE FORM OF ACTION, FOR THE ACTS OR OMISSIONS OF ANY AND
            ALL USERS (INCLUDING UNAUTHORIZED USERS) THAT ARE NOT SOLELY DUE TO COMPANY’S GROSS NEGLIGENCE OR WILLFUL MISCONDUCT, WHETHER SUCH ACTS OR OMISSIONS OCCUR DURING THE USE OF THE SERVICES OR OTHERWISE.
          </li>
        </ul>
        <ol start="3">
          <li>
            <strong>Use&nbsp;</strong>You may not do or attempt to do or facilitate a third party in doing any of the following: (1) decipher, decompile, disassemble, or reverse-engineer any of the software and/or code, if and as applicable, used to provide the Site or Services without our prior
            written authorization, including framing or mirroring any part of the Site or Services; (2) circumvent, disable, or otherwise interfere with security-related features of the Services or features that prevent or restrict use or copying of any Content; (3) use the Site, Services, or
            Content in connection with any commercial endeavors in any manner, except as specifically set forth in these Terms; (4) use any robot, spider, site search or retrieval application, or any other manual or automatic device or process to retrieve, index, data-mine, or in any way reproduce
            or circumvent the navigational structure or presentation of the Site or Services; and/or (5) use the Site, Services, or content thereon in any manner not permitted by these Terms or applicable law.
          </li>
          <li>
            <strong>Intellectual Property.&nbsp;</strong>Company or its licensors, as the case may be, have all right, title and interest in the Site, Services, and any Content thereon, including its overall appearance, text, graphics, graphics design, videos, demos, interfaces, and underlying
            source files, and all worldwide intellectual property rights, the trademarks, service marks, and logos contained therein, whether registered or unregistered. Except as expressly permitted herein, you may not copy, further develop, reproduce, republish, modify, alter download, post,
            broadcast, transmit or otherwise use the content of the Services for any purpose. You will not remove, alter, or conceal any copyright, trademark, service mark or other proprietary rights notices incorporated in the Services, if any. All trademarks are trademarks or registered trademarks
            of their respective owners. Nothing in these&nbsp;Terms should be construed as granting you any right to use any trademark, service mark, logo, or trade name of Company or any third party. If you provide Company with any feedback regarding any content on the Services, Company may use all
            such feedback without restriction and shall not be subject to any non-disclosure or non-use obligations in respect of such feedback.
          </li>
          <li>
            <strong>Disclaimers&nbsp;and Disclaimer of Warranty</strong>
          </li>
        </ol>
        <ul>
          <li>
            All information and Content posted on the Site is for informational purposes only and Company provides no guarantees with respect thereto. Your use of the Site and/or Services is at your sole discretion and risk. The Services and any content thereon are provided on an AS IS and AS
            AVAILABLE basis without warranties of any kind. We do not represent or warrant that Services will be of good quality or useful for your needs.
          </li>
          <li>
            WE EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, EXPRESS, IMPLIED OR STATUTORY, RELATING TO THE SITE, SERVICES, OR ANY CONTENT THEREON, INCLUDING WITHOUT LIMITATION THE WARRANTIES OF TITLE, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT OF PROPRIETARY RIGHTS, COURSE
            OF DEALING OR COURSE OF PERFORMANCE. WE DISCLAIM ANY WARRANTIES, EXPRESS OR IMPLIED, (I) REGARDING THE SECURITY, ACCURACY, RELIABILITY, TIMELINESS AND PERFORMANCE OF THE SITE AND/OR SERVICES; (II) THAT THE SITE OR SERVICES WILL BE ERROR-FREE OR THAT ANY ERRORS WILL BE CORRECTED; (III)
            REGARDING THE ACCURACY, QUALITY, CURRENCY, COMPLETENESS OR USEFULNESS OF ANY CONTENT OR INFORMATION PROVIDED.
          </li>
          <li>
            No advice or information, whether oral or written, obtained by you from us, shall create any warranty that is not expressly stated in these Terms. If you choose to rely on such information, you do so solely at your own risk. Some states or jurisdictions do not allow the exclusion of
            certain warranties. Accordingly, some of the above exclusions may not apply to you. Check your local laws for any restrictions or limitations regarding the exclusion of implied warranties.
          </li>
        </ul>
        <ol>
          <li>
            <strong>Limitation&nbsp;of Liability</strong>
          </li>
        </ol>
        <ul>
          <li>
            Without derogating from any of the foregoing, we assume no responsibility for any error, omission, interruption, deletion, defect, delay in operation or transmission, communications line failure, theft or destruction or unauthorized access to, or alteration of any content or the
            Services. We are not responsible for any problems or technical malfunction or failure of any telephone network or lines, computer online systems or equipment, servers or providers, software, failure due to technical problems or traffic congestion on the Internet or on the Services. Under
            no circumstances shall we be responsible for any loss or damage, including personal injury or death and any injury or damage to any person’s property, including mobile device or computer, resulting from the conduct of any users of the Services, whether online or offline. In addition, we
            assume no responsibility for any incorrect data.
          </li>
          <li>
            IN NO EVENT SHALL COMPANY, ITS AFFILIATES OR ANY OF THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, ASSIGNEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DAMAGES WHATSOEVER, INCLUDING WITHOUT LIMITATION INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES,
            ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SITE OR SERVICES, INCLUDING BUT NOT LIMITED TO THE QUALITY, ACCURACY, OR UTILITY OF THE INFORMATION PROVIDED AS PART OF OR THROUGH THE SERVICES, WHETHER THE DAMAGES ARE FORESEEABLE AND WHETHER OR NOT COMPANY HAS BEEN ADVISED OF THE
            POSSIBILITY OF SUCH DAMAGES. THE FOREGOING LIMITATION OF LIABILITY SHALL APPLY TO THE FULLEST EXTENT PERMITTED BY LAW IN THE APPLICABLE JURISDICTION AND IN NO EVENT SHALL OUR MAXIMUM CUMULATIVE LIABILITY TO YOU EXCEED US$50.
          </li>
        </ul>
        <ol start="7">
          <li>
            You agree to indemnify, defend, and hold harmless Company, its affiliates, and its/their respective employees, directors, officers, subcontractors and agents, against any and all claims, damages, or costs, losses, liabilities or expenses (including reasonable court costs and attorneys’
            fees) that arise directly or indirectly from: (a) breach of these&nbsp;Terms&nbsp;by you or anyone using your computer and/or mobile device; (b) any claim, loss or damage experienced from your use or attempted use of (or inability to use) the Site or Services; (c) your violation of any
            law or regulation relating to the Site or Services; (d) your infringement of any right of any third party.
          </li>
          <li>
            <strong>Third-Party Content.&nbsp;</strong>The Site may provide you with third-party links to websites, applications, and services. We make provide no guarantees regarding any content, goods or services provided by such third parties and all use of third-party websites and applications
            is at your own risk. Additionally, we do not accept responsibility for the privacy policies of such third parties. We do not endorse any products offered by third parties and we urge our users to exercise caution in using third-party websites or applications.
          </li>
          <li>
            These&nbsp;Terms&nbsp;shall be governed solely by the laws of the State of Israel, and without regard to the United Nations Convention on the International Sales of Goods and the competent courts in the State of Israel shall have exclusive jurisdiction to hear any disputes arising
            hereunder. In the event that any provision of these&nbsp;Terms&nbsp;is held to be unenforceable, such provision shall be replaced with an enforceable provision which most closely achieves the effect of the original provision, and the remaining terms of these Terms&nbsp;shall remain in
            full force and effect. Nothing in these Terms creates any agency, employment, joint venture, or partnership relationship between you and Company or enables you to act on behalf of Company. Except as may be expressly stated in these&nbsp;Terms, these&nbsp;Terms&nbsp;constitute the entire
            agreement between us and you pertaining to the subject matter hereof, and any and all other agreements existing between us and you relating thereto are hereby canceled. We may assign and/or transfer our rights and obligations hereunder to any third party without prior notice. You shall
            not assign and/or transfer any of your rights or obligations hereunder, and any assignment in violation of the foregoing shall be void. No waiver of any breach or default hereunder shall be deemed to be a waiver of any preceding or subsequent breach or default. If we are required to
            provide notice to you hereunder, we may provide such notice to the contact details you provided when contacting us.
          </li>
        </ol>
        <p>
          <em>Last updated:&nbsp;20.11.2022</em>
        </p>
      </Container>
      <Footer1></Footer1>
    </>
  );
};

export default TermsOfService;

export { getServerSideProps };
