import Ad from "./ad";
import styled from "@emotion/styled";
const AdWrapperTitle = styled.div`
  &:before,
  &:after {
    background-color: #d9d9d9;
    content: "";
    display: inline-block;
    height: 1px;
    position: relative;
    vertical-align: middle;
    width: 13%;
  }

  text-align: center;
  color: #999;
  font-family: open sans;
  font-size: 9px;
  font-weight: 400;
  text-transform: uppercase;
  overflow: hidden;
  line-height: 11px;
  padding: 5px 0;
`;
const AdWrapper = styled.div`
  background: #f1f1f1;
  margin: 30px auto;
  max-width: 728px;
  height: 300px;
`;

const TwoAdsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;
const HideAdWrapper = styled.div`
  ${({ theme }) => `
    ${theme.fn.smallerThan("md")} {
      display: none;
    }
  `};
`;

export default function SideBySideAds({ firstAdId = "maor2", secondAdId = "maor2" }) {
  return (
    <AdWrapper>
      <AdWrapperTitle>
        <span>ADVERTISEMENT</span>
      </AdWrapperTitle>
      <TwoAdsWrapper>
        <Ad adId={firstAdId} withoutWrapper={true}></Ad>
        <HideAdWrapper>
          <Ad adId={secondAdId} withoutWrapper={true}></Ad>
        </HideAdWrapper>
      </TwoAdsWrapper>
    </AdWrapper>
  );
}
