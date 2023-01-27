import { Container } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';
import Footer1 from '../components/layouts/footers/footer1';
import Header1 from '../components/layouts/headers/header1';
import tracking from '../components/tracking/tracking';



const P = styled.div`

`


const TermsOfService = ({ }) => {
    useEffect(() => {
        // tracking.track('vv', 'prepixel', 'FBClick', { utm_campaign, utm_source, article_id: articleId })
    }, []);

    return (
        <>
            <Header1></Header1>
            <Container size={"md"}>
                <h2>DMCA</h2>
                <p>1. The Digital Millennium Copyright Act of 1998 (the “DMCA”) provides recourse for copyright owners who believe that material appearing on the Internet, including in this site and its pages, infringes their rights under U.S. copyright law.</p>
                <p>2. If you believe, in good faith, that any content used or displayed on or through our service and/or site, infringes your copyright, you may send us a notice requesting that the content be removed, or access to it blocked.</p>
                <p>3. The notice must include, at a minimum, the following information:</p>
                <ul>
                    <li>3.1. Physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed;</li>
                    <li>3.2. Identification of the copyrighted work claimed to have been infringed (or if multiple copyrighted works are covered by a single notification, a representative list of such works);</li>
                    <li>3.3. Identification of the content that is claimed to be infringing or the subject of infringing activity, and information reasonably sufficient to allow us to locate the content on our service;</li>
                    <li>3.4. The name, address, telephone number, and email address (if available) of the complaining party;</li>
                    <li>3.5. A statement that the complaining party has a good faith belief that use of the content in the manner complained of is not authorized by the copyright owner, its agent or the law;</li>
                    <li>3.6. A statement that the information in the notification is accurate and, under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                </ul>
                <p>4. In addition and without derogation from the above, if you believe in good faith that a notice of copyright infringement has been wrongly filed against you, the DMCA permits you to send us a counter-notice.</p>
                <p>5. All notices, including counter-notices, must meet the then-current statutory requirements imposed by the DMCA; see <a href="https://www.copyright.gov/">www.copyright.gov</a> for more details.</p>
                <p>6. DMCA notices and counter-notices regarding our service should be sent to our designated copyright agent at <strong>info@54.172.149.20</strong></p>
            </Container>
            <Footer1></Footer1>
        </>
    )
}

export default TermsOfService